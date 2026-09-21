import { Check, Star, Calendar, Shield, Sparkles } from 'lucide-react';
import { useApp } from '@/context';
import { pricingPlans } from '@/data';

export default function PricingPage() {
  const { navigate, showToast } = useApp();

  const handleChoosePlan = (planName: string) => {
    showToast(`${planName} plan selected! Sign in to complete your subscription.`, 'success');
    navigate('appointment');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="gradient-hero">
        <div className="container-wide px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">Pricing</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            Choose a care plan that fits your pet and budget. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-ink-900 text-white shadow-glow lg:-translate-y-4 dark:bg-brand-600 dark:text-white'
                    : 'card card-hover'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge bg-accent-500 text-white shadow-md">
                      <Sparkles className="h-3.5 w-3.5" /> {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-ink-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-white/70' : 'text-ink-500 dark:text-ink-400'}`}>
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-ink-900 dark:text-white'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-ink-400'}`}>{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-brand-300' : 'text-brand-500'}`} />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-ink-700 dark:text-ink-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan.name)}
                  className={`mt-8 w-full rounded-xl px-6 py-3 font-semibold transition-all active:scale-95 ${
                    plan.highlighted
                      ? 'bg-white text-brand-700 hover:bg-brand-50'
                      : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-glow'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl bg-ink-50 p-6 dark:bg-ink-950">
            {[
              { icon: Shield, text: 'No hidden fees' },
              { icon: Star, text: '30-day money-back guarantee' },
              { icon: Calendar, text: 'Cancel anytime' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-ink-600 dark:text-ink-400">
                <item.icon className="h-5 w-5 text-brand-500" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 py-16 dark:bg-ink-950">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {[
                { q: 'Can I switch plans later?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we prorate the difference.' },
                { q: 'What if my pet needs emergency care?', a: 'Emergency visits are included in the Elite plan. Essential and Complete Protection plans receive discounted emergency rates.' },
                { q: 'Do plans cover multiple pets?', a: 'Each plan covers one pet. Additional pets receive a 15% discount on their plan subscription.' },
                { q: 'Are pre-existing conditions covered?', a: 'Our plans focus on preventive and routine care. We treat pre-existing conditions at standard rates, regardless of plan membership.' },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl bg-white p-5 shadow-card dark:bg-ink-900">
                  <dt className="font-bold text-ink-900 dark:text-white">{faq.q}</dt>
                  <dd className="mt-2 text-sm text-ink-600 dark:text-ink-400">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
