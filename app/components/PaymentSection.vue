<!-- components/PaymentSection.vue -->
<template>
    <div class="form-card">
        <div class="form-card-header">
            <div class="section-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                    <path d="M1.5 6.5h13" stroke="currentColor" stroke-width="1.5" />
                    <circle cx="11.5" cy="10" r="1" fill="currentColor" />
                </svg>
            </div>
            <h2 class="section-title">Pembayaran</h2>
        </div>

        <!-- Payment Summary -->
        <div class="payment-summary">
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="summary-label">Total Invoice</span>
                    <span class="summary-value">{{ formatRupiah(store.total) }}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Total Dibayar</span>
                    <span class="summary-value summary-value--paid">{{ formatRupiah(store.totalPaid) }}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Sisa Tagihan</span>
                    <span class="summary-value"
                        :class="store.remainingBalance > 0 ? 'summary-value--due' : 'summary-value--paid'">
                        {{ formatRupiah(store.remainingBalance) }}
                    </span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Status</span>
                    <span class="status-badge" :class="statusClass">{{ statusText }}</span>
                </div>
            </div>
        </div>

        <!-- Payment History -->
        <div v-if="store.payments.length > 0" class="payment-history">
            <p class="history-label">Riwayat Pembayaran</p>
            <div class="history-list">
                <div v-for="payment in store.payments" :key="payment.id" class="payment-item">
                    <div class="payment-item-left">
                        <div class="payment-item-top">
                            <span class="payment-type-badge"
                                :class="payment.type === 'dp' ? 'badge--dp' : 'badge--lunas'">
                                {{ payment.type === 'dp' ? 'DP' : 'Pelunasan' }}
                            </span>
                            <span class="payment-date">{{ formatDate(payment.paymentDate) }}</span>
                        </div>
                        <p v-if="payment.notes" class="payment-notes">{{ payment.notes }}</p>
                        <p v-if="payment.paymentMethod" class="payment-method">
                            {{ getPaymentMethodText(payment.paymentMethod) }}
                        </p>
                    </div>
                    <div class="payment-item-right">
                        <span class="payment-amount">{{ formatRupiah(payment.amount) }}</span>
                        <button v-if="canRemovePayment" type="button" @click="removePayment(payment.id)"
                            class="btn-remove-payment">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add DP Section -->
        <div v-if="store.remainingBalance > 0 && !hasDP" class="payment-section-block">
            <div class="payment-section-header">
                <div class="section-icon section-icon--sm">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" stroke-width="1.75"
                            stroke-linecap="round" />
                    </svg>
                </div>
                <p class="payment-section-label">Tambah Down Payment (DP)</p>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Jumlah DP</label>
                    <div class="input-prefix-wrap">
                        <span class="input-prefix">Rp</span>
                        <input v-model.number="store.dpAmount" type="number" min="0" :max="store.remainingBalance"
                            class="form-input with-prefix" placeholder="0">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Metode Pembayaran</label>
                    <select v-model="store.paymentMethod" class="form-input form-select">
                        <option value="bank_transfer">Transfer Bank</option>
                        <option value="cash">Tunai</option>
                        <option value="other">Lainnya</option>
                    </select>
                </div>
                <div class="form-group form-group--full">
                    <label class="form-label">Catatan</label>
                    <input v-model="store.paymentNotes" type="text" class="form-input" placeholder="Catatan DP...">
                </div>
                <div class="form-group form-group--full">
                    <button type="button" @click="addDP"
                        :disabled="store.dpAmount <= 0 || store.dpAmount > store.remainingBalance" class="btn-action">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75"
                                stroke-linecap="round" />
                        </svg>
                        Tambah DP
                    </button>
                </div>
            </div>
        </div>

        <!-- Pelunasan -->
        <div v-if="store.remainingBalance > 0 && hasDP" class="payment-section-block">
            <div class="pelunasan-row">
                <div class="pelunasan-info">
                    <p class="pelunasan-label">Sisa yang harus dibayar</p>
                    <p class="pelunasan-amount">{{ formatRupiah(store.remainingBalance) }}</p>
                </div>
                <button type="button" @click="confirmPayment" class="btn-action">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7.5l3 3 7-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    Proses Pelunasan
                </button>
            </div>
        </div>

        <!-- Custom Payment / Cicilan -->
        <div v-if="store.remainingBalance > 0 && hasDP" class="cicilan-toggle-wrap">
            <button type="button" @click="showCustomPayment = !showCustomPayment" class="btn-cicilan-toggle">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    :style="{ transform: showCustomPayment ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }">
                    <path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                {{ showCustomPayment ? 'Sembunyikan Cicilan' : 'Pembayaran Parsial (Cicilan)' }}
            </button>

            <Transition name="slide">
                <div v-if="showCustomPayment" class="payment-section-block mt-cicilan">
                    <div class="payment-section-header">
                        <div class="section-icon section-icon--sm">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <rect x="1.5" y="2.5" width="10" height="8" rx="1.5" stroke="currentColor"
                                    stroke-width="1.5" />
                                <path d="M1.5 5.5h10" stroke="currentColor" stroke-width="1.25" />
                            </svg>
                        </div>
                        <p class="payment-section-label">Pembayaran Parsial</p>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Jumlah Pembayaran</label>
                            <div class="input-prefix-wrap">
                                <span class="input-prefix">Rp</span>
                                <input v-model.number="customAmount" type="number" min="0" :max="store.remainingBalance"
                                    class="form-input with-prefix" placeholder="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Metode Pembayaran</label>
                            <select v-model="customMethod" class="form-input form-select">
                                <option value="bank_transfer">Transfer Bank</option>
                                <option value="cash">Tunai</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        <div class="form-group form-group--full">
                            <label class="form-label">Catatan</label>
                            <input v-model="customNotes" type="text" class="form-input"
                                placeholder="Catatan pembayaran...">
                        </div>
                        <div class="form-group form-group--full">
                            <button type="button" @click="addCustomPayment"
                                :disabled="!customAmount || customAmount <= 0" class="btn-action btn-action--outline">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75"
                                        stroke-linecap="round" />
                                </svg>
                                Tambah Cicilan
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>

        <!-- Paid State -->
        <div v-if="store.remainingBalance === 0 && store.payments.length > 0" class="paid-state">
            <div class="paid-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10.5l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <p class="paid-text">Invoice ini sudah <strong>lunas</strong>.</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore'
import { ref, computed } from 'vue'

const store = useInvoiceStore()
const emit = defineEmits(['payment-updated'])

const showCustomPayment = ref(false)
const customAmount = ref(0)
const customNotes = ref('')
const customMethod = ref('bank_transfer')

const hasDP = computed(() => store.payments.some(p => p.type === 'dp'))

const statusText = computed(() => {
    const map: Record<string, string> = {
        unpaid: 'Belum Dibayar',
        partial: 'Sebagian',
        dp_paid: 'DP Dibayar',
        paid: 'Lunas',
    }
    return map[store.paymentStatus] ?? 'Belum Dibayar'
})

const statusClass = computed(() => {
    const map: Record<string, string> = {
        unpaid: 'badge-status--unpaid',
        partial: 'badge-status--partial',
        dp_paid: 'badge-status--dp',
        paid: 'badge-status--paid',
    }
    return map[store.paymentStatus] ?? 'badge-status--unpaid'
})

const canRemovePayment = computed(() => !store.saving)

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

const getPaymentMethodText = (method: string) => {
    const map: Record<string, string> = { cash: 'Tunai', bank_transfer: 'Transfer Bank', other: 'Lainnya' }
    return map[method] ?? method
}

const addDP = () => {
    if (store.addDP()) emit('payment-updated')
}

const confirmPayment = () => {
    if (confirm(`Lakukan pelunasan sebesar ${formatRupiah(store.remainingBalance)}?`)) {
        if (store.addPayment()) emit('payment-updated')
    }
}

const addCustomPayment = () => {
    if (store.addCustomPayment(customAmount.value, customNotes.value)) {
        emit('payment-updated')
        customAmount.value = 0
        customNotes.value = ''
        customMethod.value = 'bank_transfer'
        showCustomPayment.value = false
    }
}

const removePayment = (paymentId: string) => {
    if (confirm('Hapus pembayaran ini?')) {
        store.removePayment(paymentId)
        emit('payment-updated')
    }
}
</script>

<style scoped>
/* ── Card (konsisten dengan form card global) ── */
.form-card {
    background: #fff;
    border: 1px solid #E5EDFF;
    border-radius: 14px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: box-shadow 0.2s;
}

.form-card:focus-within {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.06);
    border-color: #BFDBFE;
}

.form-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-icon {
    width: 30px;
    height: 30px;
    background: #EFF6FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563EB;
    flex-shrink: 0;
}

.section-icon--sm {
    width: 24px;
    height: 24px;
    border-radius: 6px;
}

.section-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #111827;
    letter-spacing: -0.01em;
    margin: 0;
}

/* ── Payment Summary ── */
.payment-summary {
    background: #F8FAFF;
    border: 1px solid #E5EDFF;
    border-radius: 10px;
    padding: 1rem 1.25rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

@media (max-width: 640px) {
    .summary-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.summary-label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #9CA3AF;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.summary-value {
    font-size: 1.0625rem;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.summary-value--paid {
    color: #16A34A;
}

.summary-value--due {
    color: #DC2626;
}

/* ── Status Badge ── */
.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    width: fit-content;
    letter-spacing: 0.01em;
}

.badge-status--unpaid {
    background: #FEF2F2;
    color: #DC2626;
}

.badge-status--partial {
    background: #FFFBEB;
    color: #D97706;
}

.badge-status--dp {
    background: #EFF6FF;
    color: #2563EB;
}

.badge-status--paid {
    background: #F0FDF4;
    color: #16A34A;
}

/* ── Payment History ── */
.payment-history {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.history-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #374151;
    letter-spacing: -0.005em;
    margin: 0;
}

.history-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.payment-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    background: #FAFAFA;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 0.875rem 1rem;
    transition: border-color 0.15s;
}

.payment-item:hover {
    border-color: #C7D7FE;
}

.payment-item-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.payment-item-top {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* DP / Lunas badge */
.payment-type-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 100px;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.03em;
}

.badge--dp {
    background: #EFF6FF;
    color: #2563EB;
}

.badge--lunas {
    background: #F0FDF4;
    color: #16A34A;
}

.payment-date {
    font-size: 0.8125rem;
    color: #6B7280;
    font-weight: 400;
}

.payment-notes {
    font-size: 0.8125rem;
    color: #6B7280;
    margin: 0;
}

.payment-method {
    font-size: 0.75rem;
    color: #9CA3AF;
    margin: 0;
}

.payment-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
}

.payment-amount {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.02em;
}

.btn-remove-payment {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #9CA3AF;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    transition: color 0.15s;
}

.btn-remove-payment:hover {
    color: #EF4444;
}

/* ── Sub-sections (DP / Pelunasan / Cicilan) ── */
.payment-section-block {
    border-top: 1px solid #F3F4F6;
    padding-top: 1.125rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}

.payment-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.payment-section-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
    letter-spacing: -0.005em;
}

/* ── Form utilities (inline — sama seperti global) ── */
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.form-group--full {
    grid-column: 1 / -1;
}

.form-label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #374151;
    letter-spacing: -0.005em;
}

.form-input {
    width: 100%;
    padding: 0.5625rem 0.75rem;
    font-size: 0.875rem;
    color: #111827;
    background: #FAFAFA;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    font-family: inherit;
    box-sizing: border-box;
}

.form-input:hover {
    border-color: #C7D7FE;
    background: #fff;
}

.form-input:focus {
    border-color: #2563EB;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input::placeholder {
    color: #C4C9D4;
}

.form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 2rem;
}

.input-prefix-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.input-prefix {
    position: absolute;
    left: 10px;
    font-size: 0.8125rem;
    color: #9CA3AF;
    font-weight: 500;
    pointer-events: none;
    z-index: 1;
}

.form-input.with-prefix {
    padding-left: 2.25rem;
}

/* ── Buttons ── */
.btn-action {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0.5625rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    background: #2563EB;
    border: 1px solid #2563EB;
    border-radius: 9px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
}

.btn-action:hover:not(:disabled) {
    background: #1D4ED8;
    border-color: #1D4ED8;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-action:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.btn-action--outline {
    color: #2563EB;
    background: #EFF6FF;
    border-color: #BFDBFE;
}

.btn-action--outline:hover:not(:disabled) {
    background: #DBEAFE;
    border-color: #93C5FD;
    box-shadow: none;
}

/* ── Pelunasan row ── */
.pelunasan-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 10px;
    padding: 0.875rem 1.125rem;
}

.pelunasan-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.pelunasan-label {
    font-size: 0.75rem;
    color: #EF4444;
    font-weight: 500;
    margin: 0;
}

.pelunasan-amount {
    font-size: 1.125rem;
    font-weight: 700;
    color: #DC2626;
    letter-spacing: -0.025em;
    margin: 0;
}

/* ── Cicilan toggle ── */
.cicilan-toggle-wrap {
    border-top: 1px solid #F3F4F6;
    padding-top: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.btn-cicilan-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #2563EB;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    transition: color 0.15s;
    width: fit-content;
}

.btn-cicilan-toggle:hover {
    color: #1D4ED8;
}

.mt-cicilan {
    margin-top: 1rem;
}

/* ── Paid State ── */
.paid-state {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    border-radius: 10px;
    padding: 0.875rem 1.125rem;
}

.paid-icon {
    width: 32px;
    height: 32px;
    background: #16A34A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.paid-text {
    font-size: 0.875rem;
    color: #15803D;
    margin: 0;
    font-weight: 500;
}

/* ── Slide transition ── */
.slide-enter-active {
    animation: slideDown 0.2s ease;
}

.slide-leave-active {
    animation: slideDown 0.15s ease reverse;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>