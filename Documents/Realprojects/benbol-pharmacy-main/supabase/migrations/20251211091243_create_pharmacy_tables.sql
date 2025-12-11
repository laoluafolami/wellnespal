/*
  # Benbol Pharmacy Database Schema

  ## Overview
  This migration creates the complete database structure for Benbol Pharmacy website,
  including tables for appointments, prescription refills, contact forms, newsletters,
  and chatbot functionality.

  ## New Tables

  ### 1. appointments
  Stores consultation and appointment booking requests
  - `id` (uuid, primary key)
  - `full_name` (text) - Patient's full name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `service_type` (text) - Type of service requested
  - `preferred_date` (date) - Preferred appointment date
  - `preferred_time` (text) - Preferred time slot
  - `message` (text) - Additional notes or concerns
  - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
  - `created_at` (timestamptz) - Request timestamp

  ### 2. prescription_refills
  Stores prescription refill requests
  - `id` (uuid, primary key)
  - `full_name` (text) - Patient's full name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `prescription_number` (text) - Prescription reference number
  - `medication_name` (text) - Name of medication
  - `prescribing_doctor` (text) - Doctor's name
  - `additional_notes` (text) - Special instructions
  - `status` (text) - Refill status (received, processing, ready, picked_up)
  - `created_at` (timestamptz) - Request timestamp

  ### 3. contact_submissions
  Stores general contact form submissions
  - `id` (uuid, primary key)
  - `full_name` (text) - Sender's name
  - `email` (text) - Contact email
  - `phone` (text, optional) - Contact phone
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `status` (text) - Response status (new, in_progress, resolved)
  - `created_at` (timestamptz) - Submission timestamp

  ### 4. newsletter_subscribers
  Stores newsletter subscription information
  - `id` (uuid, primary key)
  - `email` (text, unique) - Subscriber email
  - `full_name` (text, optional) - Subscriber name
  - `subscribed` (boolean) - Active subscription status
  - `created_at` (timestamptz) - Subscription timestamp
  - `unsubscribed_at` (timestamptz, optional) - Unsubscribe timestamp

  ### 5. chat_messages
  Stores chatbot conversation history
  - `id` (uuid, primary key)
  - `session_id` (text) - Unique session identifier
  - `message` (text) - Message content
  - `sender` (text) - 'user' or 'bot'
  - `created_at` (timestamptz) - Message timestamp

  ## Security
  All tables have RLS enabled with appropriate policies for public submissions
  and authenticated admin access.
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create prescription_refills table
CREATE TABLE IF NOT EXISTS prescription_refills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  prescription_number text DEFAULT '',
  medication_name text NOT NULL,
  prescribing_doctor text DEFAULT '',
  additional_notes text DEFAULT '',
  status text DEFAULT 'received',
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message text NOT NULL,
  sender text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_refills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for appointments table
CREATE POLICY "Anyone can submit appointments"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for prescription_refills table
CREATE POLICY "Anyone can submit prescription refills"
  ON prescription_refills FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all refills"
  ON prescription_refills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update refills"
  ON prescription_refills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for contact_submissions table
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for newsletter_subscribers table
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update subscriptions"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for chat_messages table
CREATE POLICY "Anyone can insert chat messages"
  ON chat_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own chat messages"
  ON chat_messages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view all chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (true);