<template>
  <section id="contact" aria-labelledby="contact-heading">
    <div class="contact-wrap">
      <div class="contact-info">
        <div class="section-tag reveal">Contact</div>
        <h2 id="contact-heading" class="reveal">Let’s Talk About Your <em>Next Initiative</em></h2>
        <p class="reveal intro">
          Share your objectives, timelines, and constraints — we’ll respond within one business day with
          next steps or a discovery session tailored to your stakeholders.
        </p>

        <div class="contact-links reveal">
          <a href="mailto:hello@aurobotix.com" class="contact-link">
            <span class="link-icon" aria-hidden="true">📧</span>
            <div>
              <div class="link-label">Email</div>
              <div class="link-val">hello@aurobotix.com</div>
            </div>
          </a>
          <a href="https://linkedin.com/company/aurobotix" class="contact-link" target="_blank" rel="noopener">
            <span class="link-icon" aria-hidden="true">💼</span>
            <div>
              <div class="link-label">LinkedIn</div>
              <div class="link-val">aurobotix.com</div>
            </div>
          </a>
          <a href="https://aurobotix.com" class="contact-link">
            <span class="link-icon" aria-hidden="true">🌐</span>
            <div>
              <div class="link-label">Website</div>
              <div class="link-val">www.aurobotix.com</div>
            </div>
          </a>
        </div>
      </div>

      <div class="reveal">
        <form class="contact-form" novalidate @submit.prevent="handleSubmit">
          <div class="form-row">
            <label>
              <span class="label-text">Name</span>
              <input v-model="form.name" type="text" placeholder="Your full name" required autocomplete="name">
            </label>
            <label>
              <span class="label-text">Email</span>
              <input v-model="form.email" type="email" placeholder="your@email.com" required autocomplete="email">
            </label>
          </div>
          <label>
            <span class="label-text">Organization</span>
            <input v-model="form.company" type="text" placeholder="Company or department" autocomplete="organization">
          </label>
          <label>
            <span class="label-text">Interest</span>
            <select v-model="form.service">
              <option value="">Select a topic…</option>
              <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
          <label>
            <span class="label-text">Message</span>
            <textarea v-model="form.message" placeholder="Describe goals, systems involved, and timeline…" required></textarea>
          </label>

          <Transition name="fade">
            <div v-if="submitted" class="form-success" role="alert">
              Thank you — your message has been received. We’ll follow up shortly.
            </div>
          </Transition>

          <button type="submit" class="btn-primary">Submit Inquiry →</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  'Custom Software Development',
  'Cloud Architecture & DevOps',
  'Cybersecurity & Compliance',
  'Integration & Data Platforms',
  'IT Consulting & Advisory',
  'Managed Services & Support',
]

const form = reactive({
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  Object.keys(form).forEach((k) => { (form as Record<string, string>)[k] = '' })
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>

<style scoped>
section { background: var(--dark); }

.contact-wrap {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
}

.intro {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  line-height: 1.75;
}

.contact-links { display: flex; flex-direction: column; gap: 1rem; }
.contact-link {
  display: flex; align-items: center; gap: 1rem;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem 1.3rem;
  text-decoration: none; color: var(--text); transition: all 0.25s;
}
.contact-link:hover {
  border-color: rgba(var(--rgb-accent), 0.5);
  transform: translateX(4px);
}
.link-icon  { font-size: 1.3rem; }
.link-label { font-size: 0.82rem; color: var(--text-muted); letter-spacing: 0.5px; }
.link-val   { font-size: 0.95rem; font-weight: 500; }

.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.form-row     { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

label { display: flex; flex-direction: column; gap: 0.4rem; }
.label-text {
  font-size: 0.8rem; font-weight: 600; color: var(--text-muted);
  letter-spacing: 0.5px; text-transform: uppercase;
}

input, textarea, select {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text);
  font-size: 0.95rem;
  padding: 0.75rem 1rem; outline: none;
  transition: border-color 0.2s; width: 100%;
}
input:focus, textarea:focus, select:focus { border-color: var(--accent); }
textarea { min-height: 130px; resize: vertical; }
input::placeholder, textarea::placeholder { color: var(--text-dim); }
select option { background: var(--surface2); }

.form-success {
  background: rgba(var(--rgb-accent), 0.12);
  border: 1px solid rgba(var(--rgb-accent), 0.35);
  color: var(--accent);
  padding: 1rem 1.3rem;
  border-radius: var(--radius); font-size: 0.95rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s, transform 0.4s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; transform: translateY(-6px); }

@media (max-width: 900px) {
  .contact-wrap { grid-template-columns: 1fr; gap: 2.5rem; }
  .form-row     { grid-template-columns: 1fr; }
}
</style>
