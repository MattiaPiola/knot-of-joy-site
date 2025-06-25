
-- Enable Row Level Security on the guests table
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Create a SELECT policy that allows anyone to read guest data (needed for search functionality)
CREATE POLICY "Anyone can view guests for search" 
ON public.guests 
FOR SELECT 
USING (true);

-- Create an UPDATE policy that allows updating confirmation_status and notes fields
CREATE POLICY "Anyone can update RSVP responses" 
ON public.guests 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Prevent INSERT and DELETE operations by not creating policies for them
-- This means only SELECT and UPDATE will be allowed on the table
