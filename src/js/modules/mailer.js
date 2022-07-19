function mailer(formSelector, serveraddress, modalSelector, fileSelector, labelSelector) {
    const form = document.querySelector(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо. Мы скоро свяжемся с вами",
        failure: "Что-то пошло не так..."
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.json();
    };

    const file = document.querySelector(fileSelector),
        fileLabel = document.querySelector(labelSelector);
    file.addEventListener('change', function () {
        if (this.value) {
            fileLabel.style.background = '#8dc73d';
            fileLabel.style.color = '#fff';
            fileLabel.childNodes[0].textContent = `Добавлено файлов: ${this.files.length}`;
        } else {
            fileLabel.style.background = '#eef0f4';
            fileLabel.style.color = '#a7a9b0';
            fileLabel.childNodes[0].textContent = `Выберите файл`;
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;`;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        postData(serveraddress, formData)
            .then(function () {
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
                fileLabel.style.background = '#eef0f4';
                fileLabel.style.color = '#a7a9b0';
                fileLabel.childNodes[0].textContent = `Выберите файл`;
            });
    });

    function openModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = 'block';
        document.body.style.overflow = "hidden";
    }

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = 'none';
        document.body.style.overflow = "";
    }

    function showThanksModal() {
        const prevModalDialog = document.querySelector(modalSelector).firstChild;

        prevModalDialog.style.display = 'none';
        openModal(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__thanks');
        thanksModal.innerHTML = `
            <div class="modal__title title_blgr">${message.success}</div>`;

        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'none';
            prevModalDialog.style.display = 'block';
            closeModal(modalSelector);
        }, 3000);
    }
}

export default mailer;