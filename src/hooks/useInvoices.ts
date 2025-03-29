import { useState, useEffect } from 'react'
import { Invoice } from '../types/invoice'
import { invoiceService } from '../services/invoiceService'
import { useAuth } from './useAuth'

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadInvoices()
    }
  }, [user])

  const loadInvoices = async () => {
    try {
      setLoading(true)
      const data = await invoiceService.getInvoices(user!.id)
      setInvoices(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newInvoice = await invoiceService.createInvoice(invoice)
      setInvoices(prev => [newInvoice, ...prev])
      return newInvoice
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
    try {
      const updatedInvoice = await invoiceService.updateInvoice(id, updates)
      setInvoices(prev => 
        prev.map(invoice => 
          invoice.id === id ? updatedInvoice : invoice
        )
      )
      return updatedInvoice
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const deleteInvoice = async (id: string) => {
    try {
      await invoiceService.deleteInvoice(id)
      setInvoices(prev => prev.filter(invoice => invoice.id !== id))
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    refreshInvoices: loadInvoices,
  }
} 