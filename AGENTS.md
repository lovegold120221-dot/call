# CSR Agent Repository - Agent Guidelines

## Essential Commands
- Run agent locally: `python csr_agent.py`
- Install dependencies: `pip install -r requirements.txt` or `uv add "livekit-agents[google]~=1.4" "python-dotenv>=1.0.0"`
- Setup environment: Copy `.env.example` to `.env` and add your GOOGLE_API_KEY

## Project Structure
- Main agent logic: `csr_agent.py`
- Dependencies: `requirements.txt`, `pyproject.toml`
- Environment config: `.env` (from `.env.example`)
- Frontend: `frontend/` directory

## Key Files to Understand
1. `csr_agent.py` - Contains the CSRAgent class with:
   - `_get_csr_instructions()` - Customize agent behavior/personality here
   - `job_process()` - Main entry point for LiveKit worker
   - Agent initialization with Gemini Live API configuration

2. Environment variables (in `.env`):
   - `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` (pre-configured)
   - `GOOGLE_API_KEY` - Get from Google AI Studio

## Development Notes
- The agent uses port 3332 (non-default) for LiveKit worker
- Modify `_get_csr_instructions()` in csr_agent.py to change agent behavior
- For debugging, set `thinking_config.include_thoughts = True` in csr_agent.py
- Logging level can be adjusted in csr_agent.py line 16

## Testing
- No formal test suite; verify by running the agent and testing voice interactions
- Check logs for session start/end and error conditions