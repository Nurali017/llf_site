# Deployment Guide

## Быстрый старт

### Локальная разработка
```bash
npm install
npm run dev
```

### Production build локально
```bash
npm run build
npm start
```

### Docker deployment
```bash
# Создать .env.production с нужными переменными
cp .env.example .env.production
# Отредактировать значения
nano .env.production

# Собрать и запустить
docker-compose build
docker-compose up -d
```

---

## Environment Variables

См. [.env.example](.env.example:1-18) для полного списка переменных.

**Обязательные переменные для production:**
- `NEXT_PUBLIC_API_URL` - URL бэкенд API (по умолчанию: https://1sportkz.com)
- `NEXT_PUBLIC_APP_URL` - URL приложения (ваш домен)
- `NEXT_PUBLIC_SITE_NAME` - Название сайта
- `NEXT_PUBLIC_CONTACT_EMAIL` - Email для контактов
- `NEXT_PUBLIC_CONTACT_PHONE` - Телефон для контактов

---

## Деплой на VPS

### 1. Подготовка сервера

```bash
# SSH на сервер
ssh user@your-server.com

# Обновить систему
sudo apt update && sudo apt upgrade -y

# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установить Docker Compose
sudo apt install docker-compose -y

# Установить nginx
sudo apt install nginx -y

# Установить certbot для SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Клонировать проект

```bash
cd /var/www
sudo git clone <your-repo-url> llf-site
cd llf-site
```

### 3. Настроить environment

```bash
# Создать .env.production
sudo cp .env.example .env.production
sudo nano .env.production

# Заполнить реальными значениями:
# - NEXT_PUBLIC_APP_URL=https://your-domain.com
# - И другие переменные
```

### 4. Настроить nginx

```bash
# Скопировать конфиг
sudo cp nginx/llf-site.conf /etc/nginx/sites-available/llf-site

# Обновить домен в конфиге
sudo nano /etc/nginx/sites-available/llf-site
# Заменить your-domain.com на реальный домен

# Активировать конфиг
sudo ln -s /etc/nginx/sites-available/llf-site /etc/nginx/sites-enabled/

# Тест конфига
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 5. Получить SSL сертификат

```bash
# Let's Encrypt
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автопродление (тест)
sudo certbot renew --dry-run
```

### 6. Запустить приложение

```bash
cd /var/www/llf-site
sudo ./scripts/deploy.sh
```

### 7. Проверить статус

```bash
# Статус контейнеров
docker-compose ps

# Логи
docker-compose logs -f --tail=100
```

---

## Обновление приложения

```bash
# На сервере
cd /var/www/llf-site
sudo ./scripts/deploy.sh
```

Скрипт автоматически:
- Подтянет последний код из git
- Соберет новый Docker image
- Перезапустит контейнеры
- Проверит health check

---

## Backup & Rollback

### Создать backup

```bash
./scripts/backup.sh
```

Backup сохраняется в `~/backups/llf-site/`

### Rollback на предыдущий коммит

```bash
git revert HEAD
./scripts/deploy.sh
```

### Восстановить из backup

```bash
cd ~/backups/llf-site
tar -xzf code_YYYYMMDD_HHMMSS.tar.gz -C /var/www/llf-site
cd /var/www/llf-site
./scripts/deploy.sh
```

---

## Troubleshooting

### Проблема: Контейнер не запускается

```bash
# Проверить логи
docker-compose logs

# Проверить переменные окружения
docker-compose config
```

### Проблема: Изображения не загружаются

**Решение:** Проверить remotePatterns в [next.config.js](next.config.js:10-24) и CORS настройки на API сервере.

### Проблема: 502 Bad Gateway

**Решение:**
```bash
# Проверить статус контейнера
docker-compose ps

# Перезапустить
docker-compose restart
```

### Проблема: SSL сертификат истек

**Решение:**
```bash
sudo certbot renew
sudo systemctl restart nginx
```

---

## Мониторинг

### Просмотр логов

```bash
# Docker logs
docker-compose logs -f

# nginx access logs
sudo tail -f /var/log/nginx/access.log

# nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Проверка здоровья

```bash
# Health check
curl -f http://localhost:3000

# Проверить HTTPS
curl -f https://your-domain.com
```

---

## Полезные команды

```bash
# Остановить контейнеры
docker-compose down

# Запустить контейнеры
docker-compose up -d

# Пересобрать без кеша
docker-compose build --no-cache

# Посмотреть использование ресурсов
docker stats

# Очистить неиспользуемые образы
docker system prune -a
```

---

## Checklist для деплоя

- [ ] Environment variables настроены в .env.production
- [ ] Домен указан в nginx конфиге
- [ ] SSL сертификат получен и работает
- [ ] Docker контейнер запущен
- [ ] Сайт доступен по HTTPS
- [ ] API запросы работают
- [ ] Изображения загружаются
- [ ] robots.txt доступен
- [ ] sitemap.xml доступен
- [ ] Backup создан

---

## Контакты и поддержка

При проблемах с деплоем:
1. Проверить логи (см. раздел Мониторинг)
2. Проверить переменные окружения
3. Проверить CORS настройки на API сервере
4. Проверить DNS настройки домена
