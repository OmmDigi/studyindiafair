const YOUTUBE_ID = /^[\w-]{11}$/

export function youtubeId(input: string) {
  const value = input.trim()
  if (YOUTUBE_ID.test(value)) return value
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^(www\.|m\.)/, '')
    let id: string | null = null
    if (host === 'youtu.be') id = url.pathname.slice(1)
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]+)/)?.[1] ?? null
    }
    return id && YOUTUBE_ID.test(id) ? id : null
  } catch {
    return null
  }
}
