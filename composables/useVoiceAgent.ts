// composables/useVoiceAgent.ts
// Encapsulates all Vera agent logic: chat history, speech synthesis, speech recognition

export interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  time: string
}

const VERA_SYSTEM = `You are Vera, a friendly and knowledgeable AI voice agent demo built by aurobotix.com (Aurobotix).

About Aurobotix (aurobotix.com):
- An innovative AI and robotics-minded company building intelligent voice agents, automation, and custom AI solutions
- Team: Faran (Data Scientist), Usman Gulzar (Python Developer), Tasawar Hussain (PHP/Laravel/Frappe Developer), Umer Sharif (Front-End Developer)
- Services: Voice Agent Development, AI Model Evaluation & Deployment, Machine Learning Solutions, Model Training & Optimization, Data Mining & Analysis, End-to-End AI Solutions
- Vision: To become a leading provider of AI-powered voice, robotics-inspired experiences, and automation

Your personality:
- Warm, professional, concise, and enthusiastic about AI and robotics
- Speak naturally as if in a voice conversation — keep responses conversational
- Use short paragraphs, avoid long bullet lists
- You are a demo — remind users they can have a fully custom agent trained on their own business data
- Encourage visitors to contact aurobotix.com for custom solutions

Keep responses under 120 words unless the question truly needs more detail.`

function getLocalReply(text: string): string {
  const t = text.toLowerCase()
  if (/hello|hi|hey|greet/.test(t))
    return "Hi there! 👋 I'm Vera, aurobotix.com's demo voice agent. I'm here to tell you all about what we build — intelligent voice agents, AI solutions, and a lot more. What would you like to know?"
  if (/service|offer|do|build|make|create/.test(t))
    return "Great question! aurobotix.com offers six core services:\n\n🎙️ Voice Agent Development\n🤖 AI Model Evaluation & Deployment\n🧠 Machine Learning Solutions\n⚙️ Model Training & Optimization\n📊 Data Mining & Analysis\n🚀 End-to-End AI Solutions\n\nWould you like details on any of these?"
  if (/voice|agent|conversational/.test(t))
    return "Voice agents are our specialty! We build human-like conversational agents that handle customer queries, automate workflows, and operate 24/7. The real agents we deploy are fully custom-trained on your business data, vocabulary, and brand voice."
  if (/team|who|people|member|staff/.test(t))
    return "We're a team of four passionate professionals:\n\n👨‍💻 Faran — Data Scientist\n👨‍💻 Usman Gulzar — Python Developer\n👨‍💻 Tasawar Hussain — PHP/Laravel/Frappe Developer\n👨‍💻 Umer Sharif — Front-End Developer\n\nSmall team, big impact!"
  if (/different|unique|why|choose|better/.test(t))
    return "What sets aurobotix.com apart?\n\n🎯 Tailored solutions — no generic products\n🔬 Full-stack AI expertise\n⚡ Agile, collaborative development\n🏆 Commitment to quality & innovation\n\nWe build AI that actually solves your specific problem."
  if (/start|contact|get|hire|work|project|price|cost/.test(t))
    return "Getting started is easy! Head to the Contact section on this page and send us a message. Tell us what you'd like to automate — we'll get back to you within 24 hours with a plan. 🚀"
  if (/train|model|custom|data/.test(t))
    return "Model training is one of our core strengths. We fine-tune AI models on your specific business data — call logs, documents, workflows — so your voice agent sounds like an expert in YOUR domain, not a generic bot."
  if (/machine learning|ml|predict/.test(t))
    return "Our ML solutions range from predictive analytics to intelligent automation pipelines using TensorFlow, PyTorch, scikit-learn, and more. What kind of predictions or automation are you looking for?"
  if (/tech|stack|tool|framework|language/.test(t))
    return "Our tech stack:\n\n🧠 AI/ML: TensorFlow, PyTorch, HuggingFace, LangChain\n🐍 Backend: Python, FastAPI, PHP, Laravel, Frappe\n🎙️ Voice/NLP: Whisper, spaCy, Rasa, Twilio\n💻 Frontend: React, Vue.js, Tailwind\n☁️ Cloud: AWS, Docker"
  if (/vision|mission|goal|about/.test(t))
    return "Our vision: to become a leading provider of AI-powered voice and automation solutions — enabling businesses to operate more efficiently in a rapidly evolving digital world.\n\nOur mission: help businesses leverage AI to automate smarter and make better decisions. 🌍"
  return "That's a great question! I'm Vera, a sample demo agent. For a fully custom answer tailored to your business, reach out to the aurobotix.com team via the Contact section. They'll be happy to help! 😊"
}

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function useVoiceAgent() {
  const messages = ref<ChatMessage[]>([
    {
      role: 'bot',
      text: "👋 Hi there! I'm **Vera**, a sample voice agent built by aurobotix.com.\n\nI can tell you all about what we do — from intelligent voice agents to end-to-end AI solutions. What would you like to know?",
      time: getTime()
    }
  ])

  const history = ref<{ role: string; content: string }[]>([])
  const isTyping = ref(false)
  const isSpeaking = ref(false)
  const isRecording = ref(false)
  const agentStatus = ref('● Online · Ready')
  const interimText = ref('')

  // ── Speech Synthesis ──
  function speak(text: string) {
    if (!import.meta.client || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const plain = text.replace(/\*\*/g, '').replace(/\n/g, ' ')
    const utter = new SpeechSynthesisUtterance(plain)
    utter.rate = 1.0
    utter.pitch = 1.05
    const voices = speechSynthesis.getVoices()
    const preferred =
      voices.find((v) => /female|samantha|karen|zira|google us english/i.test(v.name)) ||
      voices.find((v) => v.lang === 'en-US') ||
      voices[0]
    if (preferred) utter.voice = preferred
    isSpeaking.value = true
    agentStatus.value = '● Speaking…'
    utter.onend = () => { isSpeaking.value = false; agentStatus.value = '● Online · Ready' }
    utter.onerror = () => { isSpeaking.value = false; agentStatus.value = '● Online · Ready' }
    speechSynthesis.speak(utter)
  }

  // ── Typewriter ──
  function typewriterAdd(text: string, onDone?: () => void) {
    const msg: ChatMessage = { role: 'bot', text: '', time: getTime() }
    messages.value.push(msg)
    let i = 0
    const idx = messages.value.length - 1
    const speed = 16
    function tick() {
      if (i < text.length) {
        messages.value[idx].text = text.slice(0, ++i)
        setTimeout(tick, speed)
      } else {
        onDone?.()
      }
    }
    tick()
  }

  // ── Send message ──
  async function sendMessage(userText: string) {
    userText = userText.trim()
    if (!userText || isTyping.value) return

    messages.value.push({ role: 'user', text: userText, time: getTime() })
    history.value.push({ role: 'user', content: userText })

    isTyping.value = true
    agentStatus.value = '● Thinking…'

    await new Promise((r) => setTimeout(r, 600)) // slight delay for realism

    let reply: string
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: VERA_SYSTEM,
          messages: history.value
        })
      })
      const data = await res.json()
      reply = data?.content?.[0]?.text || getLocalReply(userText)
    } catch {
      reply = getLocalReply(userText)
    }

    history.value.push({ role: 'assistant', content: reply })
    isTyping.value = false
    agentStatus.value = '● Online · Ready'

    typewriterAdd(reply, () => speak(reply))
  }

  // ── Speech Recognition ──
  let recognition: any = null

  function initRecognition() {
    if (!import.meta.client) return
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return
    recognition = new SR()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      isRecording.value = true
      agentStatus.value = '● Listening…'
    }
    recognition.onresult = (e: any) => {
      let interim = ''
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript
        else interim += e.results[i][0].transcript
      }
      interimText.value = interim
      if (final) {
        interimText.value = ''
        stopRecording()
        sendMessage(final)
      }
    }
    recognition.onerror = (e: any) => {
      stopRecording()
      if (e.error === 'not-allowed') agentStatus.value = '● Mic blocked — check permissions'
      else if (e.error === 'no-speech') {
        agentStatus.value = '● No speech detected'
        setTimeout(() => { agentStatus.value = '● Online · Ready' }, 2500)
      } else {
        agentStatus.value = `● Mic error: ${e.error}`
        setTimeout(() => { agentStatus.value = '● Online · Ready' }, 2500)
      }
    }
    recognition.onend = () => stopRecording()
  }

  function stopRecording() {
    isRecording.value = false
    interimText.value = ''
    if (agentStatus.value === '● Listening…') agentStatus.value = '● Online · Ready'
  }

  function toggleMic() {
    if (!recognition) {
      alert('Speech recognition not supported. Please use Chrome or Edge.')
      return
    }
    if (isRecording.value) {
      recognition.stop()
      stopRecording()
    } else {
      try { recognition.start() } catch {}
    }
  }

  function hasMicSupport(): boolean {
    if (!import.meta.client) return false
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition
  }

  // Load voices
  if (import.meta.client && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
  }

  return {
    messages,
    isTyping,
    isSpeaking,
    isRecording,
    agentStatus,
    interimText,
    sendMessage,
    toggleMic,
    initRecognition,
    hasMicSupport
  }
}
