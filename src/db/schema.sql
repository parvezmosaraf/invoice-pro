-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    company_name TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    invoice_number TEXT NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
    subtotal DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2),
    tax_amount DECIMAL(10,2),
    total DECIMAL(10,2) NOT NULL,
    notes TEXT,
    terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Add Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY users_policy ON users
    FOR ALL
    USING (id = auth.uid());

-- Clients policies
CREATE POLICY clients_select_policy ON clients
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY clients_insert_policy ON clients
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY clients_update_policy ON clients
    FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY clients_delete_policy ON clients
    FOR DELETE
    USING (user_id = auth.uid());

-- Invoices policies
CREATE POLICY invoices_select_policy ON invoices
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY invoices_insert_policy ON invoices
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY invoices_update_policy ON invoices
    FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY invoices_delete_policy ON invoices
    FOR DELETE
    USING (user_id = auth.uid());

-- Invoice items policies (based on invoice ownership)
CREATE POLICY invoice_items_select_policy ON invoice_items
    FOR SELECT
    USING (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid()));

CREATE POLICY invoice_items_insert_policy ON invoice_items
    FOR INSERT
    WITH CHECK (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid()));

CREATE POLICY invoice_items_update_policy ON invoice_items
    FOR UPDATE
    USING (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid()));

CREATE POLICY invoice_items_delete_policy ON invoice_items
    FOR DELETE
    USING (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid())); 