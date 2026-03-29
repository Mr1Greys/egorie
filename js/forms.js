document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-form]').forEach(initForm);
});

function initForm(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    submitForm(form);
  });

  form.querySelectorAll('.input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-error')) {
        validateField(input);
      }
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const value = field.value.trim();
  const errorEl = field.closest('.field')?.querySelector('.field-error');

  if (field.required && !value) {
    setError(field, errorEl, 'Заполните это поле');
    return false;
  }

  if (field.type === 'tel' && value && !/^[\d\s\+\-\(\)]{7,20}$/.test(value)) {
    setError(field, errorEl, 'Введите корректный номер');
    return false;
  }

  if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setError(field, errorEl, 'Введите корректный email');
    return false;
  }

  clearError(field, errorEl);
  return true;
}

function setError(field, errorEl, message) {
  field.classList.add('is-error');
  field.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
}

function clearError(field, errorEl) {
  field.classList.remove('is-error');
  field.setAttribute('aria-invalid', 'false');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.hidden = true;
  }
}

function submitForm(form) {
  const btn = form.querySelector('[type="submit"]');
  if (btn) btn.classList.add('is-loading');

  const data = new FormData(form);
  const entries = Object.fromEntries(data.entries());

  // Simulate submission (replace with real endpoint)
  setTimeout(() => {
    if (btn) btn.classList.remove('is-loading');
    form.reset();
    showSuccess(form);
  }, 1200);
}

function showSuccess(form) {
  const msg = document.createElement('div');
  msg.className = 'form-success';
  msg.setAttribute('role', 'alert');
  msg.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>Заявка отправлена! Мы свяжемся с вами в ближайшее время.</span>
  `;

  Object.assign(msg.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'oklch(0.62 0.19 145 / 0.1)',
    border: '1px solid oklch(0.62 0.19 145 / 0.3)',
    borderRadius: '12px',
    color: 'oklch(0.42 0.14 145)',
    fontSize: '0.9rem',
    marginTop: '16px',
    animation: 'fadeIn 0.4s ease-out',
  });

  form.appendChild(msg);
  setTimeout(() => msg.remove(), 5000);
}
