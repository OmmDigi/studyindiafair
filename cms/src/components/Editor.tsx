import { useEffect, useRef } from "react";
import EditorJS, {
  type OutputData,
  type ToolConstructable,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import TextColor from "./editor-tools/TextColor";
import EditorToolbar from "./EditorToolbar";
import { Label } from "./ui/label";
import "./editor.css";
import { getErrorMessage } from "@/lib/api";
import { fileUrl, uploadFile } from "@/lib/upload";

// same limits the cms image pickers enforce
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_MB = 5;
const UPLOAD_FOLDER = "editor-assets";

const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value.trim());
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

interface EditorProps {
  onSave?: (data: OutputData) => void;
  label?: string;
  initData?: OutputData;
}

export default function Editor({ onSave, label, initData }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const holder = document.createElement("div");
    container.appendChild(holder);
    let disposed = false;

    const editor = new EditorJS({
      holder,
      autofocus: false,
      data: initData,

      tools: {
        // inline tool, so it shows up in the selection toolbar of every block
        // that has the inline toolbar enabled
        textColor: {
          class: TextColor as unknown as ToolConstructable,
        },
        header: {
          class: Header,
          inlineToolbar: true,
          // every level is offered, and the stylesheet gives each one a
          // distinct size — that heading picker is the size control
          config: {
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        list: List,
        quote: Quote,
        table: Table,
        code: Code,
        // video embeds. Pasting a YouTube or Vimeo link onto an empty line
        // converts it into a player on its own — the tool registers those urls
        // as paste patterns — and the toolbar's video button does the same for
        // a link typed in rather than pasted.
        embed: {
          // cast because the tool types its own onPaste as pattern-paste only,
          // which is narrower than the BlockTool interface EditorJS declares —
          // a mismatch in the library's typings, not in how it is used here
          class: Embed as unknown as ToolConstructable,
          config: {
            services: {
              youtube: true,
              vimeo: true,
            },
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                if (!IMAGE_TYPES.includes(file.type)) {
                  alert("Unsupported file type. Use JPEG, PNG, WEBP or GIF.");
                  return { success: 0 };
                }
                if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
                  alert(`Image must be ${MAX_IMAGE_MB}MB or smaller`);
                  return { success: 0 };
                }

                try {
                  const uploaded = await uploadFile(file, UPLOAD_FOLDER);
                  // the upload server returns a path; the block keeps the
                  // full url so the image renders wherever the content goes
                  return {
                    success: 1,
                    file: { url: fileUrl(uploaded.url), path: uploaded.url },
                  };
                } catch (err) {
                  alert(`Uploading failed: ${getErrorMessage(err)}`);
                  return { success: 0 };
                }
              },
              // lets the editor take an image that is already hosted elsewhere
              async uploadByUrl(url: string) {
                if (!isHttpUrl(url)) {
                  alert("Enter a full image url, for example https://cdn.site.com/a.jpg");
                  return { success: 0 };
                }

                return { success: 1, file: { url: url.trim() } };
              },
            },
          },
        },
        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true,
        },
      },

      onReady: () => {
        if (!disposed) editorRef.current = editor;
      },

      onChange: async (api) => {
        const output = await api.saver.save();
        onSaveRef.current?.(output);
      },
    });

    return () => {
      disposed = true;
      holder.hidden = true;
      if (editorRef.current === editor) editorRef.current = null;
      editor.isReady
        .then(() => editor.destroy())
        .catch(() => {})
        .finally(() => holder.remove());
    };
  }, []);

  return (
    <div className="grid gap-3">
      {label ? <Label className="font-semibold">{label}</Label> : null}
      <div className="border-1 border-green-600 rounded-lg">
        {/* the fixed toolbar: EditorJS only ever shows its own toolbars next
            to the selection, so this one sits above the content and stays */}
        <EditorToolbar getEditor={() => editorRef.current} />
        <div className="editor-content px-6 py-5" ref={containerRef}></div>
      </div>
    </div>
  );
}
