<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  // ⬇️ put YOUR values here
  const SUPABASE_URL = "https://uuoyhuxaklbyvfayilcy.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1b3lodXhha2xieXZmYXlpbGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNzA0NzEsImV4cCI6MjA3Njk0NjQ3MX0.Ahdw5G3woFlLjMjTWuS8uqdQYcB7KnDL_MCaFYKkMIs";

  (async () => {
    try {
      const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { error } = await sb.from('fire_watches').select('id', { head:true, count:'exact' });
      const pill = document.getElementById('backendPill');
      if (error) { console.error(error); pill.textContent = 'Backend: connection error'; }
      else { pill.textContent = 'Backend: connected'; }
    } catch (e) {
      console.error(e);
      document.getElementById('backendPill').textContent = 'Backend: script load error';
    }
  })();
</script>
