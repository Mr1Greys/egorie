const CALC_DATA = {
  materials: {
    'pesok-seyanyy': { name: 'Песок сеяный',       pricePerTon: 350,  density: 1.5, deliveryPerKmTon: 30  },
    'pesok-mytyy':   { name: 'Песок мытый',        pricePerTon: 550,  density: 1.6, deliveryPerKmTon: 30  },
    'shcheben-5-20': { name: 'Щебень гранит 5–20', pricePerTon: 1800, density: 1.4, deliveryPerKmTon: 25  },
    'galka':         { name: 'Галька',             pricePerTon: 5500, density: 1.6, deliveryPerKmTon: 35  },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-calculator]').forEach(initCalculator);
});

function initCalculator(container) {
  const materialSelect = container.querySelector('[data-calc-material]');
  const volumeInput = container.querySelector('[data-calc-volume]');
  const unitSelect = container.querySelector('[data-calc-unit]');
  const distanceInput = container.querySelector('[data-calc-distance]');
  const resultEl = container.querySelector('[data-calc-result]');
  const detailEl = container.querySelector('[data-calc-detail]');

  if (!materialSelect || !volumeInput || !distanceInput || !resultEl) return;

  function calculate() {
    const materialKey = materialSelect.value;
    const material = CALC_DATA.materials[materialKey];
    if (!material) {
      resultEl.textContent = '—';
      if (detailEl) detailEl.textContent = '';
      return;
    }

    let volume = parseFloat(volumeInput.value) || 0;
    const unit = unitSelect ? unitSelect.value : 'ton';
    const distance = parseFloat(distanceInput.value) || 0;

    let tons = volume;
    if (unit === 'm3') {
      tons = volume * material.density;
    }

    const materialCost = tons * material.pricePerTon;
    const deliveryCost = (distance > 0 && tons > 0)
      ? Math.round(tons * distance * material.deliveryPerKmTon)
      : 0;

    const total = materialCost + deliveryCost;

    if (total > 0) {
      resultEl.textContent = formatPrice(Math.round(total)) + ' ₽';
      if (detailEl) {
        const parts = [];
        parts.push(`Материал: ${formatPrice(Math.round(materialCost))} ₽`);
        if (deliveryCost > 0) {
          parts.push(`Доставка: ${formatPrice(Math.round(deliveryCost))} ₽`);
        }
        if (unit === 'm3' && tons !== volume) {
          parts.push(`≈ ${tons.toFixed(1)} т`);
        }
        detailEl.textContent = parts.join(' · ');
      }
    } else {
      resultEl.textContent = '—';
      if (detailEl) detailEl.textContent = 'Укажите параметры для расчёта';
    }
  }

  [materialSelect, volumeInput, distanceInput].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  if (unitSelect) {
    unitSelect.addEventListener('change', calculate);
  }

  calculate();
}

function formatPrice(n) {
  return n.toLocaleString('ru-RU');
}
