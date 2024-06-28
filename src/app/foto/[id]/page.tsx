import { notFound } from 'next/navigation'
import { photoGet } from '@/actions/photo-get'
import { PhotoContent } from '@/components/photo/photo-content'

interface FotoIdProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: FotoIdProps) {
  const { data } = await photoGet(params.id)

  if (!data) {
    return {
      title: 'Fotos',
    }
  }

  return {
    title: data.photo.title,
  }
}

export default async function FotoIdPage({ params }: FotoIdProps) {
  const { data } = await photoGet(params.id)

  if (!data) return notFound()

  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  )
}
