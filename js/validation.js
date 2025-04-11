let form = document.getElementById("paymentForm");
let personalName = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let city = document.getElementById("city");
let area = document.getElementById("area");
let street = document.getElementById("street");

let paymentMethodVisa = document.getElementById("paymentMethodVisa");
let cash = document.getElementById("cash");

let cardNumber = document.getElementById("cardNumber");
let cardDate = document.getElementById("cardDate");
let cardCvv = document.getElementById("cardCvv");
let cardName = document.getElementById("cardName");

// ---------- الرسائل ----------

const setSuccess = (ele) => {
      let parent = ele.parentElement;
      let error = parent.querySelector(".error-massege");
      error.innerHTML = "";
      ele.classList.add("success");
      ele.classList.remove("error");
};

const setError = (ele, message) => {
      let parent = ele.parentElement;
      let error = parent.querySelector(".error-massege");
      error.innerHTML = message;
      ele.classList.add("error");
      ele.classList.remove("success");
};

const validateNotEmpty = (ele, message) => {
      if (ele.value.trim() === "") {
            setError(ele, message);
            return false;
      } else {
            setSuccess(ele);
            return true;
      }
};

// ---------- تحقق مخصص للفيزا ----------

cardNumber.addEventListener("input", () => {
      let raw = cardNumber.value.replace(/\D/g, "").slice(0, 16);
      let formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
      cardNumber.value = formatted;
});

cardDate.addEventListener("input", () => {
      let raw = cardDate.value.replace(/\D/g, "").slice(0, 4);
      if (raw.length >= 3) {
            cardDate.value = raw.slice(0, 2) + "/" + raw.slice(2);
      } else {
            cardDate.value = raw;
      }
});

cardCvv.addEventListener("input", () => {
      cardCvv.value = cardCvv.value.replace(/\D/g, "").slice(0, 3);
});

const validateCardNumber = () => {
      let value = cardNumber.value.replace(/\s/g, '');
      if (!/^\d{16}$/.test(value)) {
            setError(cardNumber, "رقم البطاقة يجب أن يكون 16 رقمًا");
            return false;
      } else {
            setSuccess(cardNumber);
            return true;
      }
};

const validateCardDate = () => {
      if (!/^\d{2}\/\d{2}$/.test(cardDate.value)) {
            setError(cardDate, "التاريخ يجب أن يكون بصيغة MM/YY");
            return false;
      } else {
            setSuccess(cardDate);
            return true;
      }
};

const validateCardCvv = () => {
      if (!/^\d{3}$/.test(cardCvv.value)) {
            setError(cardCvv, "الرمز يجب أن يكون 3 أرقام");
            return false;
      } else {
            setSuccess(cardCvv);
            return true;
      }
};
const validatePaymentMethod = () => {
      const error = document.getElementById("paymentError");
      if (!paymentMethodVisa.checked && !cash.checked) {
            error.innerText = "من فضلك اختر وسيلة الدفع";
            return false;
      } else {
            error.innerText = "";
            return true;
      }
};



// ---------- ربط onblur ----------

personalName.onblur = () => validateNotEmpty(personalName, "من فضلك أدخل الاسم");
email.onblur = () => validateNotEmpty(email, "من فضلك أدخل البريد الإلكتروني");
phone.onblur = () => validateNotEmpty(phone, "من فضلك أدخل رقم الهاتف");
city.onblur = () => validateNotEmpty(city, "من فضلك أدخل المدينة");
area.onblur = () => validateNotEmpty(area, "من فضلك أدخل المنطقة");
street.onblur = () => validateNotEmpty(street, "من فضلك أدخل الشارع");

cardNumber.onblur = () => paymentMethodVisa.checked && validateCardNumber();
cardDate.onblur = () => paymentMethodVisa.checked && validateCardDate();
cardCvv.onblur = () => paymentMethodVisa.checked && validateCardCvv();
cardName.onblur = () => paymentMethodVisa.checked && validateNotEmpty(cardName, "من فضلك أدخل اسم صاحب البطاقة");

// ---------- عند إرسال النموذج ----------

form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      isValid &= validateNotEmpty(personalName, "من فضلك أدخل الاسم");
      isValid &= validateNotEmpty(email, "من فضلك أدخل البريد الإلكتروني");
      isValid &= validateNotEmpty(phone, "من فضلك أدخل رقم الهاتف");
      isValid &= validateNotEmpty(city, "من فضلك أدخل المدينة");
      isValid &= validateNotEmpty(area, "من فضلك أدخل المنطقة");
      isValid &= validateNotEmpty(street, "من فضلك أدخل الشارع");
      isValid &= validatePaymentMethod();

      if (paymentMethodVisa.checked) {
            isValid &= validateCardNumber();
            isValid &= validateCardDate();
            isValid &= validateCardCvv();
            isValid &= validateNotEmpty(cardName, "من فضلك أدخل اسم صاحب البطاقة");
      }

      if (isValid) {
            form.submit();
      }
});
