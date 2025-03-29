import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const db = {
  // Users
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },

  // Clients
  async getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async createClient(client: any) {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateClient(id: string, updates: any) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Invoices
  async getInvoices() {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        client:clients(id, name, email, company_name),
        items:invoice_items(*)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getInvoice(id: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        client:clients(id, name, email, company_name),
        items:invoice_items(*)
      `)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createInvoice(invoice: any, items: any[]) {
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert([invoice])
      .select()
      .single()
    
    if (invoiceError) throw invoiceError

    const itemsWithInvoiceId = items.map(item => ({
      ...item,
      invoice_id: invoiceData.id
    }))

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsWithInvoiceId)

    if (itemsError) throw itemsError

    return invoiceData
  },

  async updateInvoice(id: string, invoice: any, items: any[]) {
    // Update invoice
    const { error: invoiceError } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
    
    if (invoiceError) throw invoiceError

    // Delete existing items
    const { error: deleteError } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', id)

    if (deleteError) throw deleteError

    // Insert new items
    const itemsWithInvoiceId = items.map(item => ({
      ...item,
      invoice_id: id
    }))

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsWithInvoiceId)

    if (itemsError) throw itemsError

    return this.getInvoice(id)
  },

  async deleteInvoice(id: string) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
} 