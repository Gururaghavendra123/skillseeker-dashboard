
-- Add new columns to the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS interests TEXT;

-- Create skills table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies to skills table
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Users can select their own skills
CREATE POLICY "Users can view their own skills"
  ON public.skills
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own skills
CREATE POLICY "Users can insert their own skills"
  ON public.skills
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own skills
CREATE POLICY "Users can update their own skills"
  ON public.skills
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own skills
CREATE POLICY "Users can delete their own skills"
  ON public.skills
  FOR DELETE
  USING (auth.uid() = user_id);
