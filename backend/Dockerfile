FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# ── Installer les dépendances PHP PENDANT le build de l'image ──
RUN composer install --no-dev --optimize-autoloader --no-interaction

# ── Config de l'image ──
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# ── Config Laravel ──
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# ── Laisse Composer tourner en root ──
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]