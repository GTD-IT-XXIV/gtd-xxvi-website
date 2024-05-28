FROM registry.access.redhat.com/ubi9:9.3-1610 as base
RUN echo -e "[Stripe]\nname=stripe\nbaseurl=https://packages.stripe.dev/stripe-cli-rpm-local/\nenabled=1\ngpgcheck=0" >> /etc/yum.repos.d/stripe.repo
RUN yum -y install stripe && yum clean all

FROM alpine:3.19

RUN addgroup --system --gid 1001 stripe \
  && adduser --system --uid 1001 stripecli

COPY --from=base --chown=stripecli:stripe /usr/local/bin/stripe /bin/stripe

USER stripecli

CMD exec /bin/stripe listen --api-key $STRIPE_SECRET_KEY --forward-to web:3000/api/webhook
