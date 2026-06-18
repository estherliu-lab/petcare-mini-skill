const STORAGE_KEY = "petcare-mini-skill-language";
const CONCERN_KEYS = [
  "shedding",
  "pickyEating",
  "anxiety",
  "lowActivity",
  "dentalCare",
  "weightControl",
  "seniorCare",
  "puppyKittenCare",
  "sensitiveStomach",
  "none"
];

const state = {
  language: "en",
  lastPlainText: ""
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  state.language = localStorage.getItem(STORAGE_KEY) || "en";
  els.languageSelect.value = state.language;

  renderLanguage();
  bindEvents();
});

function cacheElements() {
  els.languageSelect = document.querySelector("#languageSelect");
  els.form = document.querySelector("#petForm");
  els.petType = document.querySelector("#petType");
  els.petName = document.querySelector("#petName");
  els.age = document.querySelector("#age");
  els.ageUnit = document.querySelector("#ageUnit");
  els.weight = document.querySelector("#weight");
  els.neutered = document.querySelector("#neutered");
  els.concernList = document.querySelector("#concernList");
  els.formError = document.querySelector("#formError");
  els.resultEmpty = document.querySelector("#resultEmpty");
  els.resultContent = document.querySelector("#resultContent");
  els.copyButton = document.querySelector("#copyButton");
  els.copyStatus = document.querySelector("#copyStatus");
  els.resetButton = document.querySelector("#resetButton");
  els.foodSafetyList = document.querySelector("#foodSafetyList");
}

function bindEvents() {
  els.languageSelect.addEventListener("change", () => {
    state.language = els.languageSelect.value;
    localStorage.setItem(STORAGE_KEY, state.language);
    renderLanguage();

    if (!els.resultContent.hidden) {
      generatePlan();
    }
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    generatePlan();
  });

  els.resetButton.addEventListener("click", () => {
    els.form.reset();
    els.petType.value = "";
    els.ageUnit.value = "years";
    els.neutered.value = "unknown";
    clearResult();
  });

  els.copyButton.addEventListener("click", copyResult);
}

function t() {
  return window.PETCARE_TRANSLATIONS[state.language] || window.PETCARE_TRANSLATIONS.en;
}

function translate(path) {
  return path.split(".").reduce((value, key) => value?.[key], t()) || "";
}

function renderLanguage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = translate(node.dataset.i18nPlaceholder);
  });

  renderSelect(els.petType, t().petTypes);
  renderSelect(els.ageUnit, t().ageUnits);
  renderSelect(els.neutered, t().neuteredOptions);
  renderConcerns();
  renderFoodSafety();

  els.ageUnit.value ||= "years";
  els.neutered.value ||= "unknown";
}

function renderSelect(select, options) {
  const currentValue = select.value;
  select.innerHTML = Object.entries(options)
    .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
    .join("");

  if (Object.hasOwn(options, currentValue)) {
    select.value = currentValue;
  }
}

function renderConcerns() {
  const selected = getSelectedConcerns();

  els.concernList.innerHTML = CONCERN_KEYS.map((key) => {
    const checked = selected.includes(key) ? "checked" : "";
    return `
      <label class="concern-option">
        <input type="checkbox" name="concerns" value="${key}" ${checked} />
        <span>${escapeHtml(t().concerns[key])}</span>
      </label>
    `;
  }).join("");

  els.concernList.querySelectorAll("input[name='concerns']").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.value === "none" && input.checked) {
        uncheckOtherConcerns();
      }

      if (input.value !== "none" && input.checked) {
        const noneInput = els.concernList.querySelector("input[value='none']");
        noneInput.checked = false;
      }
    });
  });
}

function renderFoodSafety() {
  els.foodSafetyList.innerHTML = t().food.items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function generatePlan() {
  const profile = readProfile();
  els.copyStatus.textContent = "";

  if (!profile.petType || !profile.age || !profile.weight) {
    els.formError.textContent = t().validation.required;
    return;
  }

  els.formError.textContent = "";
  const plan = buildPlan(profile);
  renderPlan(plan);
  state.lastPlainText = toPlainText(plan);
  els.copyButton.disabled = false;
}

function readProfile() {
  const concerns = getSelectedConcerns().filter((key) => key !== "none");

  return {
    petType: els.petType.value,
    petName: els.petName.value.trim(),
    age: els.age.value,
    ageUnit: els.ageUnit.value,
    weight: els.weight.value,
    neutered: els.neutered.value,
    concerns
  };
}

function getSelectedConcerns() {
  return Array.from(document.querySelectorAll("input[name='concerns']:checked")).map(
    (input) => input.value
  );
}

function uncheckOtherConcerns() {
  els.concernList.querySelectorAll("input[name='concerns']").forEach((input) => {
    if (input.value !== "none") {
      input.checked = false;
    }
  });
}

function buildPlan(profile) {
  const copy = t();
  const name = profile.petName || copy.planText.unnamed;
  const petTypeLabel = copy.petTypes[profile.petType];
  const concernItems = profile.concerns;

  const daily = [
    ...copy.planText.dailyBase,
    ...(copy.planText.dailyType[profile.petType] || []),
    ...concernItems.map((key) => copy.planText.dailyConcern[key]).filter(Boolean)
  ];

  const feeding = [
    ...copy.planText.feedingBase,
    ...concernItems.map((key) => copy.planText.feedingConcern[key]).filter(Boolean)
  ];

  const grooming = [
    ...copy.planText.groomingBase,
    ...(copy.planText.groomingType[profile.petType] || [])
  ];

  const mood = getMood(profile);

  return {
    profileSummary: format(copy.planText.profile, {
      name,
      type: petTypeLabel,
      age: profile.age,
      unit: copy.ageUnits[profile.ageUnit],
      weight: profile.weight,
      neutered: copy.neuteredOptions[profile.neutered]
    }),
    sections: [
      { title: copy.sections.daily, items: unique(daily) },
      { title: copy.sections.feeding, items: unique(feeding) },
      { title: copy.sections.grooming, items: unique(grooming) },
      { title: copy.sections.health, items: copy.planText.healthTemplate },
      { title: copy.sections.vaccine, items: copy.planText.vaccineTemplate }
    ],
    moodTitle: copy.sections.mood,
    mood
  };
}

function getMood(profile) {
  const moodSet = t().planText.mood[profile.petType];

  if (profile.concerns.includes("anxiety") && moodSet.anxiety) {
    return moodSet.anxiety;
  }

  if (profile.petType === "cat" && profile.concerns.includes("pickyEating")) {
    return moodSet.pickyEating;
  }

  if (profile.petType === "dog" && profile.concerns.includes("lowActivity")) {
    return moodSet.lowActivity;
  }

  return moodSet.default;
}

function renderPlan(plan) {
  els.resultEmpty.hidden = true;
  els.resultContent.hidden = false;

  const sectionHtml = plan.sections
    .map(
      (section) => `
        <article class="result-card">
          <h3>${escapeHtml(section.title)}</h3>
          <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");

  els.resultContent.innerHTML = `
    <article class="result-card">
      <h3>${escapeHtml(t().result.profileTitle)}</h3>
      <p>${escapeHtml(plan.profileSummary)}</p>
    </article>
    ${sectionHtml}
    <article class="result-card mood-card">
      <h3>${escapeHtml(plan.moodTitle)}</h3>
      <p>${escapeHtml(plan.mood)}</p>
    </article>
  `;
}

function toPlainText(plan) {
  const blocks = [
    `# ${t().hero.title}`,
    "",
    `## ${t().result.profileTitle}`,
    plan.profileSummary,
    ""
  ];

  plan.sections.forEach((section) => {
    blocks.push(`## ${section.title}`);
    section.items.forEach((item) => blocks.push(`- ${item}`));
    blocks.push("");
  });

  blocks.push(`## ${plan.moodTitle}`);
  blocks.push(plan.mood);
  blocks.push("");
  blocks.push(`${t().disclaimer.title}: ${t().disclaimer.body}`);

  return blocks.join("\n");
}

async function copyResult() {
  if (!state.lastPlainText) {
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(state.lastPlainText);
    } else {
      fallbackCopy(state.lastPlainText);
    }
    els.copyStatus.textContent = t().result.copied;
  } catch {
    try {
      fallbackCopy(state.lastPlainText);
      els.copyStatus.textContent = t().result.copied;
    } catch {
      els.copyStatus.textContent = t().result.copyFailed;
    }
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function clearResult() {
  els.resultEmpty.hidden = false;
  els.resultContent.hidden = true;
  els.resultContent.innerHTML = "";
  els.formError.textContent = "";
  els.copyStatus.textContent = "";
  els.copyButton.disabled = true;
  state.lastPlainText = "";
}

function unique(items) {
  return [...new Set(items)];
}

function format(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
