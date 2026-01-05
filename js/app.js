document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const editor = document.getElementById('editor');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    // Загрузка файла
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            editor.value = e.target.result;
            showStatus(`Загружено: ${file.name}`, 'success');
        };
        reader.onerror = function() {
            showStatus('Ошибка при чтении файла', 'error');
        };
        reader.readAsText(file);
    });

    // Сохранение файла
    saveBtn.addEventListener('click', function() {
        const text = editor.value;
        if (!text) {
            showStatus('Текст пуст!', 'error');
            return;
        }

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'note.txt'; // имя файла по умолчанию
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showStatus('Файл сохранён как "note.txt"', 'success');
    });

    // Вывод статуса
    function showStatus(message, type) {
        status.textContent = message;
        status.style.display = 'block';
        status.className = 'status';
        status.classList.add(type === 'success' ? 'success' : 'error');

        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }
});
