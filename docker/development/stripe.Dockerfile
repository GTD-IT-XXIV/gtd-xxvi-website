FROM fedora as base
RUN echo -e "[Stripe]\nname=stripe\nbaseurl=https://packages.stripe.dev/stripe-cli-rpm-local/\nenabled=1\ngpgcheck=0" >> /etc/yum.repos.d/stripe.repo
RUN yum -y install stripe

FROM alpine
  COPY --from=base /usr/local/bin/stripe /bin/stripe

CMD exec /bin/stripe listen --api-key $STRIPE_SECRET_KEY --forward-to web/api/webhook
