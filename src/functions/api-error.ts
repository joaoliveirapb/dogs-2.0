export function apiError(error: unknown): {
  ok: false
  error: string
  data: null
} {
  if (error instanceof Error) {
    return { ok: false, error: error.message, data: null }
  } else {
    return { ok: false, error: 'Erro genérico', data: null }
  }
}
