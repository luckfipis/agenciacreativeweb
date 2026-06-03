/* =============================================================
   script.js — Agência Criativa Web
   Funcionalidades: menu hambúrguer, scroll do header,
                    animações ao rolar a página e envio do form.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MENU HAMBÚRGUER ─────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Fecha o menu ao clicar em qualquer link mobile
  mobileMenu.querySelectorAll('.nav-mobile__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });


  /* ── 2. HEADER COM SCROLL ───────────────────────────── */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    // Adiciona sombra ao header ao rolar
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });


  /* ── 3. ANIMAÇÕES DE ENTRADA (Intersection Observer) ── */
  // Adiciona classe fade-in a todos os elementos animáveis
  const animTargets = document.querySelectorAll(
    '.servico-card, .depo-card, .sobre__text, .sobre__visual, ' +
    '.contato__info, .contato__form-wrap, .servicos__header, .depoimentos h2'
  );

  animTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // anima apenas uma vez
        }
      });
    },
    { threshold: 0.12 }
  );

  animTargets.forEach(el => observer.observe(el));


  /* ── 4. FORMULÁRIO DE CONTATO ───────────────────────── */
  const form     = document.getElementById('contatoForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validação básica
      const nome     = form.nome.value.trim();
      const email    = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        feedback.textContent = 'Por favor, preencha os campos obrigatórios.';
        feedback.style.color = '#e05c5c';
        return;
      }

      // Simula envio (sem backend real)
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando…';
      btn.disabled    = true;

      setTimeout(() => {
        feedback.textContent = '✓ Mensagem enviada! Retornaremos em breve.';
        feedback.style.color = 'var(--clr-gold)';
        form.reset();
        btn.textContent = 'Enviar mensagem';
        btn.disabled    = false;
      }, 1400);
    });
  }

});