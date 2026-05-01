<template>
  <section id="tech" aria-labelledby="tech-heading">
    <div class="section-tag reveal">// technology stack</div>
    <h2 id="tech-heading" class="reveal">Built With the <em>Best</em></h2>
    <p class="section-lead reveal">We leverage industry-leading frameworks, libraries, and platforms to build robust AI solutions.</p>

    <div class="tech-grid">
      <div
        v-for="(cat, i) in categories"
        :key="cat.title"
        class="tech-cat reveal"
        :class="`reveal-delay-${i % 3}`"
      >
        <div class="cat-title">
          <span aria-hidden="true">{{ cat.icon }}</span> {{ cat.title }}
        </div>
        <div class="tags">
          <span v-for="tag in cat.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { icon: '🧠', title: 'AI / ML',    tags: ['TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'LangChain', 'OpenAI'] },
  { icon: '🐍', title: 'Backend',    tags: ['Python', 'FastAPI', 'PHP', 'Laravel', 'Frappe', 'REST APIs'] },
  { icon: '🎙️', title: 'Voice & NLP', tags: ['Whisper', 'TTS', 'NLTK', 'spaCy', 'Rasa', 'Twilio'] },
  { icon: '💻', title: 'Frontend',   tags: ['React', 'Vue.js', 'JavaScript', 'HTML/CSS', 'Tailwind'] },
  { icon: '🗄️', title: 'Data & Cloud', tags: ['PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Pandas', 'Spark'] },
  { icon: '🔧', title: 'Tools',      tags: ['Git', 'CI/CD', 'Jupyter', 'MLflow', 'Airflow'] },
]
</script>

<style scoped>
section { background: var(--dark); }

.tech-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;
}

.tech-cat {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.8rem;
}
.cat-title {
  font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: var(--primary-light); margin-bottom: 1.2rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.tag {
  background: var(--dark3); border: 1px solid var(--border);
  color: var(--text-muted); font-size: 0.82rem; font-weight: 500;
  padding: 0.35rem 0.85rem; border-radius: 8px;
  transition: all 0.2s; cursor: default;
}
.tag:hover { border-color: var(--primary); color: var(--primary-light); background: rgba(10,110,212,0.08); }
</style>
