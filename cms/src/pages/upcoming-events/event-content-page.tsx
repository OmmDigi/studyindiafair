import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { UpcomingEvent } from '@/types/upcoming-event'
import { PastEditionSection } from './past-edition-section'
import { UniversityLogosSection } from './university-logos-section'

export function EventContentPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['upcoming-event', id],
    queryFn: () => upcomingEventService.get(id),
    enabled: id > 0,
  })

  const onSaved = (saved: UpcomingEvent) => {
    qc.setQueryData(['upcoming-event', id], saved)
    qc.invalidateQueries({ queryKey: ['upcoming-events'] })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild size="icon-sm" variant="outline" title="Back">
          <Link to="/upcoming-events">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">{event?.name ?? 'Event not found'}</h1>
          {event && <p className="text-sm text-muted-foreground">Page content · /{event.slug}</p>}
        </div>
      </div>
      {event ? (
        <>
          <PastEditionSection key={`past-${event.id}`} event={event} onSaved={onSaved} />
          <UniversityLogosSection key={`logos-${event.id}`} event={event} onSaved={onSaved} />
        </>
      ) : (
        error && <p className="text-sm text-muted-foreground">This event could not be loaded.</p>
      )}
    </div>
  )
}
