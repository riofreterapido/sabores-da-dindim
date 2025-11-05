// Importar o CSS
import './style.css'

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault()
      const target = document.querySelector(href)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Adicionar classe ativa ao link de navegação quando a seção está visível
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-100px 0px -66%'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id')
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active')
        }
      })
    }
  })
}, observerOptions)

// Observar todas as seções
document.querySelectorAll('section[id]').forEach(section => {
  observer.observe(section)
})

// Lazy loading de imagens (opcional, para melhor performance)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img)
  })
}

// Analytics simples (opcional)
console.log('Sabores da Dindim - Site carregado com sucesso!')
