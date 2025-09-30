import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HandicapLookup() {
  const { t } = useTranslation()
  const [matricula, setMatricula] = useState('')
  const [apellido, setApellido] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])

  const onSearch = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (matricula) params.set('matricula', matricula)
      if (apellido) params.set('apellido', apellido)
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/handicap?` + params.toString())
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setResults(Array.isArray(data.results) ? data.results : [])
    } catch (err) {
      setError(t('handicap.error') || 'No se pudo consultar el hándicap')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="handicap" className="py-5 bg-white">
      <div className="container">
        <div className="p-4 p-md-5 rounded-4 shadow-sm">
          <div className="mb-4 text-center">
            <h2 className="fw-bold">{t('handicap.title') || 'Consultá tu hándicap'}</h2>
            <p className="text-muted mb-0">{t('handicap.subtitle') || 'Buscá por matrícula o por apellido'}</p>
          </div>

          <form className="row g-3 justify-content-center" onSubmit={onSearch}>
          <div className="col-12 col-md-4">
            <label className="form-label">{t('handicap.matricula') || 'Matrícula'}</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} className="form-control" placeholder="SUPER02" />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">{t('handicap.apellido') || 'Apellido'}</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control" placeholder="Perez" />
          </div>
          <div className="col-12 col-md-2 d-flex align-items-end">
            <button className="btn btn-success w-100" disabled={loading} type="submit">
              {loading ? (t('handicap.searching') || 'Buscando...') : (t('handicap.search') || 'Buscar')}
            </button>
          </div>
          </form>

          {error && <div className="alert alert-danger mt-4">{error}</div>}

          {results.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>{t('handicap.columns.matricula') || 'Matrícula'}</th>
                    <th>{t('handicap.columns.nombre') || 'Nombre'}</th>
                    <th>{t('handicap.columns.apellido') || 'Apellido'}</th>
                    <th>{t('handicap.columns.club') || 'Club'}</th>
                    <th>{t('handicap.columns.handicap') || 'Hándicap'}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((p, i) => (
                    <tr key={i}>
                      <td>{p.matricula}</td>
                      <td>{p.nombre}</td>
                      <td>{p.apellido}</td>
                      <td>{p.club}</td>
                      <td>{p.handicap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


