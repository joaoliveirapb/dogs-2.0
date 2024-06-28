import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Página não encontrada.</h1>
      <Link
        className="button"
        style={{ display: 'inline-block', marginBottom: '1rem' }}
        href="/"
      >
        Volte para a home.
      </Link>
    </section>
  )
}
