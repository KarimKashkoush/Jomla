let form = document.getElementById("paymentForm");
let personalName = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let city = document.getElementById("city");
let area = document.getElementById("area");
let street = document.getElementById("street");

let paymentMethodVisa = document.getElementById("paymentMethodVisa");
let cash = document.getElementById("cash");
let paymentMethodTabby = document.getElementById("paymentMethodTabby");
let paymentMethodTamara = document.getElementById("paymentMethodTamara");

let cardNumber = document.getElementById("cardNumber");
let cardDate = document.getElementById("cardDate");
let cardCvv = document.getElementById("cardCvv");
let cardName = document.getElementById("cardName");
let cardInfoSection = document.querySelector(".card-info");

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

const validatePaymentMethod = () => {
      const error = document.getElementById("paymentError");
      if (!paymentMethodVisa.checked && !cash.checked && !paymentMethodTabby.checked && !paymentMethodTamara.checked) {
            error.innerText = "من فضلك اختر وسيلة الدفع";
            return false;
      } else {
            error.innerText = "";
            return true;
      }
};

personalName.onblur = () => validateNotEmpty(personalName, "من فضلك أدخل الاسم");
email.onblur = () => validateNotEmpty(email, "من فضلك أدخل البريد الإلكتروني");
phone.onblur = () => validateNotEmpty(phone, "من فضلك أدخل رقم الهاتف");
city.onblur = () => validateNotEmpty(city, "من فضلك أدخل المدينة");
area.onblur = () => validateNotEmpty(area, "من فضلك أدخل المنطقة");
street.onblur = () => validateNotEmpty(street, "من فضلك أدخل الشارع");

form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      isValid &= validateNotEmpty(personalName, "من فضلك أدخل الاسم");
      isValid &= validateNotEmpty(email, "من فضلك أدخل البريد الإلكتروني");
      isValid &= validateNotEmpty(phone, "من فضلك أدخل رقم الهاتف");
      isValid &= validateNotEmpty(city, "من فضلك أدخل المدينة");
      isValid &= validateNotEmpty(area, "من فضلك أدخل المنطقة");
      isValid &= validateNotEmpty(street, "من فضلك أدخل الشارع");
      isValid &= validatePaymentMethod(); // التحقق من اختيار وسيلة الدفع

      if (cash.checked) {
            let firstPayment = document.getElementById("firstPayment");
            let numberOfInstallments = document.getElementById("numberOfInstallments");
            isValid &= validateNotEmpty(firstPayment, "من فضلك أدخل الدفعة الأولى");
            if (numberOfInstallments.value === "") {
                  setError(numberOfInstallments, "من فضلك اختر عدد أشهر الأقساط");
                  isValid &= false;
            } else {
                  setSuccess(numberOfInstallments);
            }
      }

      if (isValid) {
            form.submit();  // إرسال النموذج إذا كانت جميع الحقول صحيحة
      }
});

form.onchange = () => {
      let totalValue = document.getElementById("totalValue");
      let totalInput = document.getElementById("total");
      let firstPaymentInput = +(document.getElementById("firstPayment").value);
      let numberOfInstallmentsSelect = document.getElementById("numberOfInstallments").value;
      let installmentAmountInput = document.getElementById("installmentAmount");

      let total = parseFloat(totalValue.innerHTML.replace(/[^\d.]/g, ''));
      totalInput.value = total;

      if (firstPaymentInput && numberOfInstallmentsSelect) {
            installmentAmountInput.value = ((total - firstPaymentInput) / numberOfInstallmentsSelect).toFixed(2);
      } else {
            installmentAmountInput.value = "";
      }
};
