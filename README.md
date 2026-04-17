# CSR Agent with Gemini Live API

A Customer Service Representative (CSR) agent built with LiveKit and Google's Gemini Live API for natural voice conversations.

## Features

- **Natural Voice Conversations**: Low-latency, two-way audio interactions using Gemini Live API
- **Professional Customer Service**: Trained specifically for customer service scenarios
- **Emotional Intelligence**: Affective dialog support for empathetic responses
- **Proactive Interactions**: Natural conversation flow with proactive audio
- **Scalable Architecture**: Built on LiveKit for production deployment

## Prerequisites

1. **Google AI API Key**: Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **LiveKit Cloud Account**: Sign up at [LiveKit Cloud](https://cloud.livekit.io)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd ccaller-gem
```

2. Install dependencies:
```bash
pip install -r requirements.txt
# or using uv
uv add "livekit-agents[google]~=1.4" "python-dotenv>=1.0.0"
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

## Configuration

Edit the `.env` file with your credentials:

```env
# LiveKit Configuration (provided)
LIVEKIT_URL=wss://tts-mozilla-f1zttm7l.livekit.cloud
LIVEKIT_API_KEY=APIRWWXA4MPYw6h
LIVEKIT_API_SECRET=tPYEDRMpCJHcG1jXg7HQKnXhqqxVqPe9xCrMTcYc2BA

# Google AI Configuration (replace with your key)
GOOGLE_API_KEY=your_actual_google_api_key_here
```

## Running the Agent

### Local Development

```bash
python csr_agent.py
```

### Production Deployment

The agent can be deployed to LiveKit Cloud or any cloud platform that supports Python.

## Agent Capabilities

The CSR agent is trained to handle:

- **Product Information**: Answer questions about products and features
- **Technical Support**: Troubleshoot common technical issues
- **Billing Inquiries**: Handle billing and account questions
- **Service Changes**: Process cancellations and modifications
- **Escalation**: Know when to escalate to specialized teams

## Customization

### Modifying Agent Behavior

Edit the `_get_csr_instructions()` method in `csr_agent.py` to customize the agent's personality, knowledge base, and response patterns.

### Adding New Capabilities

You can extend the agent by:
1. Adding new tools and functions
2. Integrating with external APIs
3. Implementing custom conversation flows
4. Adding specialized knowledge bases

## Architecture

The agent uses:
- **LiveKit Agents**: Real-time communication infrastructure
- **Gemini Live API**: Natural language understanding and generation
- **Affective Dialog**: Emotional intelligence for better customer interactions
- **Proactive Audio**: Natural conversation timing and flow

## Monitoring and Logs

The agent includes comprehensive logging for:
- Session connections and disconnections
- Customer interactions
- Error conditions
- Performance metrics

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Verify your API keys are correct
2. **Connection Issues**: Check network connectivity and LiveKit URL
3. **Voice Quality**: Ensure proper microphone setup and network bandwidth

### Debug Mode

Enable debug logging by modifying the logging level:
```python
logging.basicConfig(level=logging.DEBUG)
```

## API Reference

### LiveKit Agents Documentation
- [Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai.md)
- [Gemini Plugin Documentation](https://docs.livekit.io/agents/models/realtime/plugins/gemini.md)

### Google Gemini Live API
- [Official Documentation](https://ai.google.dev/gemini-api/docs/live)
- [Model Information](https://ai.google.dev/gemini-api/docs/live-guide)

## License

This project is licensed under the MIT License.
=======
# call
>>>>>>> 74a7ee2078959c254c59693b2222849f88f803aa
