// Скрипт для проверки правильности slug

const organizations = [
  { id: 2, name: "LLF ASTANA" },
  { id: 3, name: "LLF BALKHASH" },
  { id: 4, name: "LLF KARAGANDY" },
  { id: 5, name: "LLF KOKSHETAU" },
  { id: 6, name: "LLF ULYTAU" },
  { id: 7, name: "LLF QYZYLORDA" },
  { id: 9, name: "LLF URALSK" },
  { id: 10, name: "LLF SHYMKENT" },
  { id: 11, name: "LLF TURKESTAN" },
  { id: 12, name: "LLF AKTOBE" },
  { id: 16, name: "LLF TALDYKORGAN" },
  { id: 21, name: "LLF TURKESTAN REGION" },
  { id: 23, name: "LLF KULSARY" },
  { id: 28, name: "LLF SCHUCHINSK" },
  { id: 32, name: "LLF OSKEMEN" },
  { id: 37, name: "LLF KOSTANAY" },
  { id: 38, name: "FREEDOM BFL" },
  { id: 39, name: "QAZALY REGION" }
];

function generateSlug(organizationName) {
  return organizationName
    .replace(/^LLF\s+/i, '') // Убираем префикс "LLF "
    .replace(/\s+/g, '-')    // Заменяем пробелы на дефисы
    .toLowerCase()
    .trim();
}

console.log('Проверка всех slug:\n');
organizations.forEach(org => {
  const slug = generateSlug(org.name);
  console.log(`${org.id}\t${org.name.padEnd(25)}\t→ ${slug}`);
  console.log(`\thttps://kmff.kz/${slug}`);
});

console.log(`\n\nВсего организаций: ${organizations.length}`);
