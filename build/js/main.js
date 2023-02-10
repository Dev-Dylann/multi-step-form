// BLUEPRINT CLASS FOR ALL OF USERS INPUT

class userSummary {
  constructor() {
    this.personalInfo = {
      name: "",
      email: "",
      phone: "",
    };
    this.plan = "";
    this.calendarPlan = "monthly";
    this.addOns = [];
  }
}

// GET CURRENT STEP FROM URL

const getStep = () => {
  const urlParams = new URLSearchParams(location.search);
  let step = urlParams.get(`step`);

  if (!step) {
    step = 1;
  }

  return step;
};

// HIGHLIGHT THE CURRENT STEP NUMBERBY GIVING IT ACTIVE CLASS

const highlightCurrentStepNumber = (step) => {
  const allSteps = document.querySelector(`#steps`);

  const currentStep = allSteps.children[step - 1];

  currentStep.classList.add(`active`);
};

// DISPLAY THE STEP THAT THE USER IS CURRENTLY ON AND HIDES THE BACK BUTTON DEPENDING ON THE STEP NUMBER

const showCurrentStep = (step) => {
  const sections = document.querySelectorAll(`section`);
  const currrentSection = document.getElementById(`${step}`);
  sections.forEach((e) => {
    e.classList.add(`hidden`);
  });

  currrentSection.classList.remove(`hidden`);

  const buttonSection = document.querySelector(`#button-section`);
  const backButton = document.querySelector(`#back-btn`);
  if (step > 1) {
    buttonSection.classList.replace(`justify-end`, `justify-between`);
    backButton.classList.remove(`hidden`);
  } else {
    buttonSection.classList.replace(`justify-between`, `justify-end`);
    backButton.classList.add(`hidden`);
  }
};

// STORES THE USER INFO IN LOCAL STORAGE

const storeInfo = (infoObj) => {
  const stringInfo = JSON.stringify(infoObj);

  localStorage.setItem(`userSummary`, stringInfo);
};

// GETS THE USER INFO FROM LOCAL STORAGE

const getInfo = () => {
  const stringInfo = localStorage.getItem(`userSummary`);
  const infoObj = JSON.parse(stringInfo);

  return infoObj;
};

// GET THE USER'S PERSONAL INFO FROM THE FIRST STEP AND STORE IN LOCAL STORAGE

const getPersonalInfo = () => {
  const nameInput = document.querySelector(`#name`);
  const mailInput = document.querySelector(`#mail`);
  const phoneInput = document.querySelector(`#phone`);

  const userInfo = new userSummary();

  userInfo.personalInfo.name = nameInput.value;
  userInfo.personalInfo.email = mailInput.value;
  userInfo.personalInfo.phone = phoneInput.value;

  storeInfo(userInfo);
};

// GETS THE USER'S SELECTED GAME PLAN AND STORES IN LOCAL STORAGE

const getGamePlan = () => {
  const allPlans = document.querySelectorAll(`.game-plan`);

  allPlans.forEach((e, index, array) => {
    e.onclick = () => {
      for (i = 0; i < array.length; i++) {
        array[i].classList.remove(`selected`);
      }

      e.classList.add(`selected`);

      const userInfo = getInfo();
      userInfo.plan = e.id;

      storeInfo(userInfo);
    };
  });
};

// CHANGES THE PRICE OF THE PLANS BASED ON THE CALENDAR PLAN SELECTED

const changePrices = (calendarPlan) => {
  const allPlans = document.querySelectorAll(`.game-plan`);

  allPlans.forEach((e) => {
    const price = e.querySelector(`.price`);
    const discount = e.querySelector(`.discount`);
    const selectedPrice = e.getAttribute(`data-${calendarPlan}`);

    price.innerHTML = selectedPrice;
    discount.classList.toggle(`hidden`);
  });
};

// TOGGLES BETWEEN MONTHLY AND YEARLY PLANS. I REFER TO THEM AS CALENDAR PLANS

const toggleCalendarPlan = () => {
  const checkbox = document.querySelector(`#plan-toggle`);

  let calendarPlan;

  checkbox.oninput = () => {
    const stat = checkbox.checked;
    if (stat) {
      calendarPlan = `yearly`;
    } else {
      calendarPlan = `monthly`;
    }

    changePrices(calendarPlan);

    const userInfo = getInfo();
    userInfo.calendarPlan = calendarPlan;
    storeInfo(userInfo);
  };
};

// HIDES THE CURRENT STEP AND DISPLAYS THE NEXT STEP WHEN CALLED

const showNextStep = () => {
  let current = getStep();

  current++;

  window.location = `index.html?step=${current}`;
};

// HIDES THE CURRENT STEP AND DISPLAYS THE PREVIOUS STEP

const previousStep = () => {
  const current = getStep();

  const prev = current - 1;

  window.location = `index.html?step=${prev}`;
};

// MAIN FUNCTION

const initApp = () => {
  const step = getStep();
  highlightCurrentStepNumber(step);
  showCurrentStep(step);

  const nextButton = document.querySelector(`#next-btn`);
  nextButton.onclick = () => {
    if (step == 1) {
      getPersonalInfo();
    }

    showNextStep();
  };

  getGamePlan();
  toggleCalendarPlan();

  const backButton = document.querySelector(`#back-btn`);
  backButton.onclick = () => {
    previousStep();
  };
};

initApp();
