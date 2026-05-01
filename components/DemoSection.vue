<template>
  <section id="demo" aria-labelledby="demo-heading">
    <div class="demo-layout">
      <!-- Left info panel -->
      <div class="demo-info">
        <div class="section-tag reveal">// live demo</div>
        <h2 id="demo-heading" class="reveal">Meet <em>Vera</em> — Our Voice Agent</h2>
        <p class="section-lead reveal" style="margin-bottom:0">
          Chat with Vera, a sample AI voice agent built on aurobotix.com technology.
          Ask about our services, AI capabilities, or anything voice-agent related.
        </p>

        <div class="agent-card reveal">
          <div class="agent-header">
            <div class="avatar-wrap">
              <div class="agent-avatar">🎙️</div>
              <div class="status-dot" aria-hidden="true"></div>
            </div>
            <div>
              <div class="agent-name">Vera — aurobotix.com Agent</div>
              <div class="agent-title">Voice AI Demo · v1.0-sample</div>
            </div>
          </div>
          <p class="agent-desc">
            Vera is a sample conversational AI agent. In production, she's replaced with a
            fully custom-trained voice model tuned to your brand and use case.
          </p>
        </div>

        <div class="suggestions reveal">
          <div class="suggestions-label">Try asking:</div>
          <div class="chips">
            <button
              v-for="chip in chips"
              :key="chip"
              class="chip"
              @click="agent.sendMessage(chip)"
            >{{ chip }}</button>
          </div>
        </div>
      </div>

      <!-- Chat window -->
      <div class="chat-window reveal" role="log" aria-live="polite" aria-label="Chat with Vera">
        <!-- Top bar -->
        <div class="chat-topbar">
          <div class="topbar-left">
            <div class="topbar-avatar" aria-hidden="true">🎙️</div>
            <div>
              <div class="topbar-name">
                Vera
                <span class="speak-bars" :class="{ active: agent.isSpeaking.value }" aria-hidden="true">
                  <span v-for="i in 5" :key="i" class="speak-bar"></span>
                </span>
              </div>
              <div class="topbar-status">{{ agent.agentStatus.value }}</div>
            </div>
          </div>
          <div class="topbar-badge">SAMPLE AGENT</div>
        </div>

        <!-- Messages -->
        <div class="messages" ref="messagesEl">
          <div
            v-for="(msg, i) in agent.messages.value"
            :key="i"
            :class="['msg', msg.role]"
          >
            <div :class="['msg-avatar', msg.role === 'bot' ? 'bot-av' : 'user-av']">
              {{ msg.role === 'bot' ? 'V' : '👤' }}
            </div>
            <div>
              <div class="msg-bubble" v-html="formatMessage(msg.text)"></div>
              <div class="msg-time">{{ msg.time }}</div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="agent.isTyping.value" class="msg bot typing-row">
            <div class="msg-avatar bot-av">V</div>
            <div class="typing-bubble">
              <span v-for="i in 3" :key="i" class="typing-dot"></span>
            </div>
          </div>
        </div>

        <!-- Input bar -->
        <div class="inputbar">
          <textarea
            ref="inputEl"
            v-model="inputText"
            class="chat-input"
            :placeholder="agent.isRecording.value ? '🎤 Listening…' : 'Type your message…'"
            rows="1"
            aria-label="Message input"
            @keydown.enter.exact.prevent="submit"
            @input="autoResize"
          ></textarea>

          <button
            class="mic-btn"
            :class="{ recording: agent.isRecording.value }"
            :title="agent.isRecording.value ? 'Stop listening' : 'Voice input'"
            :aria-label="agent.isRecording.value ? 'Stop voice input' : 'Start voice input'"
            @click="agent.toggleMic()"
          >🎤</button>

          <button
            class="send-btn"
            :disabled="agent.isTyping.value || !inputText.trim()"
            aria-label="Send message"
            @click="submit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
            </svg>
          </button>
        </div>
        <div class="disclaimer">Sample agent · Powered by aurobotix.com · Swap with your custom model anytime</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const agent = useVoiceAgent()
const inputEl = ref<HTMLTextAreaElement | null>(null)
const messagesEl = ref<HTMLElement | null>(null)
const inputText = ref('')

const chips = [
  'What can aurobotix.com build for me?',
  'How does voice AI work?',
  'Tell me about your team',
  'What makes you different?',
  'How do I get started?',
  'What is model training?',
]

function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

function submit() {
  const t = (agent.isRecording.value ? agent.interimText.value : inputText.value).trim()
  if (!t) return
  inputText.value = ''
  if (inputEl.value) { inputEl.value.style.height = 'auto' }
  agent.sendMessage(t)
}

function autoResize() {
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
    inputEl.value.style.height = Math.min(inputEl.value.scrollHeight, 100) + 'px'
  }
}

// Scroll to bottom when messages change
watch(
  () => agent.messages.value.length,
  async () => {
    await nextTick()
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  }
)

onMounted(() => {
  agent.initRecognition()
})
</script>

<style scoped>
section {
  background: var(--dark2);
  position: relative;
  overflow: hidden;
}
section::before {
  content: '';
  position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(10,110,212,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.demo-layout {
  display: grid; grid-template-columns: 1fr 1.6fr; gap: 4rem; align-items: start;
}
.demo-info { position: sticky; top: 100px; }

.agent-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 2rem;
  position: relative; overflow: hidden; margin-top: 2rem;
}
.agent-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}
.agent-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
.avatar-wrap  { position: relative; }
.agent-avatar {
  width: 52px; height: 52px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(10,110,212,0.4);
}
.status-dot {
  position: absolute; bottom: 2px; right: 2px;
  width: 12px; height: 12px; border-radius: 50%;
  background: #22c55e; border: 2px solid var(--surface);
  animation: pulse 2s ease infinite;
}
.agent-name  { font-weight: 700; font-size: 1rem; }
.agent-title { font-size: 0.78rem; color: var(--accent); }
.agent-desc  { font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; }

.suggestions       { margin-top: 1.5rem; }
.suggestions-label { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 0.7rem; }
.chips             { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chip {
  background: var(--dark3); border: 1px solid var(--border);
  color: var(--text-muted); font-size: 0.8rem;
  padding: 0.35rem 0.85rem; border-radius: 20px;
  cursor: pointer; transition: all 0.2s;
}
.chip:hover { border-color: var(--primary); color: var(--primary-light); background: rgba(10,110,212,0.1); }

/* ── Chat window ── */
.chat-window {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex; flex-direction: column;
  height: 580px; overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
}
.chat-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid var(--border);
  background: var(--dark3); flex-shrink: 0;
}
.topbar-left   { display: flex; align-items: center; gap: 0.75rem; }
.topbar-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
}
.topbar-name   { font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem; }
.topbar-status { font-size: 0.72rem; color: #22c55e; }
.topbar-badge  {
  font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;
  color: var(--accent); background: rgba(0,229,200,0.1);
  border: 1px solid rgba(0,229,200,0.2);
  padding: 0.2rem 0.6rem; border-radius: 4px;
}

/* Speaking bars */
.speak-bars { display: none; align-items: center; gap: 3px; height: 16px; }
.speak-bars.active { display: flex; }
.speak-bar { width: 3px; border-radius: 3px; background: var(--primary-light); animation: wave 1.2s ease infinite; }
.speak-bar:nth-child(1) { height: 40%; animation-delay: 0s; }
.speak-bar:nth-child(2) { height: 100%; animation-delay: 0.1s; }
.speak-bar:nth-child(3) { height: 70%; animation-delay: 0.2s; }
.speak-bar:nth-child(4) { height: 90%; animation-delay: 0.15s; }
.speak-bar:nth-child(5) { height: 50%; animation-delay: 0.05s; }

/* Messages */
.messages {
  flex: 1; overflow-y: auto; padding: 1.4rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  scroll-behavior: smooth;
}
.messages::-webkit-scrollbar { width: 3px; }
.messages::-webkit-scrollbar-thumb { background: var(--border); }

.msg { display: flex; gap: 0.7rem; align-items: flex-end; animation: msgIn 0.3s ease both; }
.msg.user { flex-direction: row-reverse; }

.msg-avatar {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700;
}
.bot-av  { background: linear-gradient(135deg, var(--primary-dark), var(--primary)); box-shadow: 0 0 12px rgba(10,110,212,0.35); }
.user-av { background: var(--dark3); border: 1px solid var(--border); color: var(--text-muted); }

.msg-bubble {
  max-width: 76%; padding: 0.75rem 1.1rem;
  border-radius: 16px; font-size: 0.9rem; line-height: 1.65;
}
.msg.bot  .msg-bubble { background: var(--dark3); border: 1px solid var(--border); border-bottom-left-radius: 4px; color: var(--text); }
.msg.user .msg-bubble { background: var(--primary); color: var(--white); border-bottom-right-radius: 4px; }
.msg-time { font-size: 0.68rem; color: var(--text-dim); margin-top: 0.25rem; }
.msg.user .msg-time { text-align: right; }

/* Typing */
.typing-row { align-items: center; }
.typing-bubble {
  background: var(--dark3); border: 1px solid var(--border);
  border-radius: 16px; border-bottom-left-radius: 4px;
  padding: 0.75rem 1.1rem; display: flex; gap: 5px; align-items: center;
}
.typing-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted);
  animation: typingDot 1.4s ease infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

/* Input bar */
.inputbar {
  padding: 1rem 1.4rem; border-top: 1px solid var(--border);
  display: flex; gap: 0.7rem; align-items: flex-end;
  background: var(--dark3); flex-shrink: 0;
}
.chat-input {
  flex: 1; background: var(--surface2); border: 1px solid var(--border);
  border-radius: 12px; color: var(--text);
  font-size: 0.9rem;
  padding: 0.65rem 1rem; outline: none; resize: none;
  min-height: 42px; max-height: 100px;
  transition: border-color 0.2s; line-height: 1.5;
}
.chat-input:focus { border-color: var(--primary); }
.chat-input::placeholder { color: var(--text-dim); }

.send-btn {
  width: 42px; height: 42px; border-radius: 10px;
  background: var(--primary); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: white; transition: all 0.2s; flex-shrink: 0;
}
.send-btn:hover    { background: var(--primary-light); transform: scale(1.05); }
.send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.mic-btn {
  width: 42px; height: 42px; border-radius: 10px;
  background: var(--surface2); border: 1px solid var(--border);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; transition: all 0.2s; flex-shrink: 0;
}
.mic-btn:hover     { border-color: var(--primary); }
.mic-btn.recording {
  background: rgba(239,68,68,0.15); border-color: #ef4444;
  animation: micPulse 1s ease infinite;
}

.disclaimer {
  font-size: 0.72rem; color: var(--text-dim);
  text-align: center; padding: 0.6rem 1.4rem;
  border-top: 1px solid rgba(10,110,212,0.08);
  background: var(--dark3);
}

@media (max-width: 900px) {
  .demo-layout { grid-template-columns: 1fr; gap: 2rem; }
  .demo-info   { position: static; }
  .chat-window { height: 480px; }
}
</style>
