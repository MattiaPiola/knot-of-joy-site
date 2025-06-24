
-- Add the notes column if it doesn't exist (this will be ignored if it already exists)
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS notes text;
