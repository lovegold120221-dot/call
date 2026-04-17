#!/usr/bin/env python3
"""
CSR Agent using LiveKit and Gemini Live API
A customer service representative agent with voice capabilities
"""

import os
import asyncio
import logging
from dotenv import load_dotenv

from livekit.agents import AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import google

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class CSRAgent:
    """Customer Service Representative Agent"""
    
    def __init__(self):
        """Initialize CSR agent with Gemini Live API"""
        try:
            self.session = AgentSession(
                llm=google.realtime.RealtimeModel(
                    model="gemini-2.5-flash-native-audio-preview-12-2025",
                    voice="Puck",
                    temperature=0.7,
                    instructions=self._get_csr_instructions(),
                    # Enable thinking for better customer service responses
                    thinking_config={
                        "include_thoughts": False  # Set to True for debugging
                    },
                    # Enable proactive audio for more natural conversations
                    proactivity=True,
                    # Enable affective dialog for emotional intelligence
                    enable_affective_dialog=True,
                ),
                # Configure turn handling for natural conversation flow
                turn_handling={
                    "max_response_time": 30.0,  # Maximum time to wait for response
                    "min_response_time": 0.5,   # Minimum time before responding
                }
            )
            logger.info("CSR Agent initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize CSR Agent: {e}")
            raise
        
    def _get_csr_instructions(self) -> str:
        """Get detailed instructions for the CSR agent"""
        return """
You are a professional Customer Service Representative (CSR) for a modern technology company.

Your core responsibilities:
1. **Be empathetic and patient** - Always acknowledge customer concerns with genuine understanding
2. **Be knowledgeable** - Provide accurate information about products, services, and policies
3. **Be efficient** - Resolve issues quickly while maintaining quality service
4. **Be professional** - Maintain a calm, friendly, and respectful tone at all times

Key behaviors:
- Start each conversation with a warm greeting and introduction
- Listen carefully to understand the customer's issue completely
- Ask clarifying questions when needed to fully understand problems
- Provide clear, step-by-step solutions when troubleshooting
- Offer alternatives when the preferred solution isn't available
- Summarize actions taken and confirm customer satisfaction
- End conversations professionally, thanking the customer

Topics you can help with:
- Product information and features
- Technical troubleshooting and support
- Billing and account inquiries
- Service cancellations and changes
- General company information
- Escalation to specialized teams when needed

When you don't know something:
- Be honest about limitations
- Promise to find accurate information
- Escalate to appropriate specialists when necessary

Remember: Every interaction is an opportunity to create a positive customer experience and build long-term loyalty.
"""

    async def handle_customer_interaction(self, ctx: JobContext):
        """Handle main customer interaction loop"""
        logger.info(f"Starting CSR session for room: {ctx.room.name}")
        
        try:
            # Connect to room
            await ctx.connect()
            logger.info("Connected to LiveKit room successfully")
            
            # Log session start
            await self._log_session_start(ctx)
            
            # Start the agent session
            async with self.session:
                logger.info("CSR agent session started")
                
                # Set up event handlers for better CSR workflow
                await self._setup_event_handlers(ctx)
                
                # Keep session alive with monitoring
                await self._monitor_session(ctx)
                    
        except asyncio.CancelledError:
            logger.info("CSR session cancelled gracefully")
        except Exception as e:
            logger.error(f"Error in customer interaction: {e}")
            await self._handle_session_error(ctx, e)
            raise
        finally:
            await self._log_session_end(ctx)
            logger.info("CSR session ended")

    async def _setup_event_handlers(self, ctx: JobContext):
        """Set up event handlers for the CSR session"""
        # You can add custom event handlers here
        # For example: track conversation topics, sentiment analysis, etc.
        pass

    async def _monitor_session(self, ctx: JobContext):
        """Monitor the session for health and performance"""
        try:
            while True:
                # Add session monitoring logic here
                # For example: check for long silences, connection quality, etc.
                await asyncio.sleep(10)  # Check every 10 seconds
        except asyncio.CancelledError:
            logger.info("Session monitoring stopped")
            raise

    async def _log_session_start(self, ctx: JobContext):
        """Log session start for analytics"""
        logger.info(f"Session started - Room: {ctx.room.name}, Job ID: {ctx.job.id}")
        # You can add analytics logging here

    async def _log_session_end(self, ctx: JobContext):
        """Log session end for analytics"""
        logger.info(f"Session ended - Room: {ctx.room.name}, Job ID: {ctx.job.id}")
        # You can add analytics logging here

    async def _handle_session_error(self, ctx: JobContext, error: Exception):
        """Handle session errors appropriately"""
        logger.error(f"Session error in room {ctx.room.name}: {error}")
        # You can add error recovery logic here

async def job_process(ctx: JobContext):
    """Main job processing function for LiveKit"""
    logger.info(f"Received job: {ctx.job}")
    
    # Create and configure the CSR agent
    csr_agent = CSRAgent()
    
    # Handle the customer interaction
    await csr_agent.handle_customer_interaction(ctx)

if __name__ == "__main__":
    # Verify environment variables
    required_vars = ["LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET", "GOOGLE_API_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
        logger.error("Please copy .env.example to .env and fill in the required values")
        exit(1)
    
    # Start the LiveKit worker
    logger.info("Starting CSR Agent worker...")
    
    worker_options = WorkerOptions(
        entrypoint_fnc=job_process,
        port=3332,  # Use port 3332 instead of default
        # Add any additional worker configuration here
    )
    
    cli.run_app(worker_options)
