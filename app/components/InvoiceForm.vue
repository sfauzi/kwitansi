<!-- components/InvoiceForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="invoice-form">

    <!-- Business Information -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="section-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5" />
            <path d="M5 8h6M5 5.5h4M5 10.5h3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
          </svg>
        </div>
        <h2 class="section-title">Informasi Bisnis</h2>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Nama Bisnis <span class="required">*</span></label>
          <input v-model="store.businessInfo.name" type="text" required class="form-input"
            placeholder="PT. Contoh Sejahtera">
        </div>
        <div class="form-group">
          <label class="form-label">Email Bisnis <span class="required">*</span></label>
          <input v-model="store.businessInfo.email" type="email" required class="form-input"
            placeholder="bisnis@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">No WhatsApp</label>
          <input v-model="store.businessInfo.whatsapp" type="tel" class="form-input" placeholder="08xx-xxxx-xxxx">
        </div>
        <div class="form-group">
          <label class="form-label">Nama Bank</label>
          <input v-model="store.businessInfo.bankName" type="text" class="form-input"
            placeholder="BCA, Mandiri, BNI...">
        </div>
        <div class="form-group">
          <label class="form-label">No Rekening</label>
          <input v-model="store.businessInfo.bankAccount" type="text" class="form-input" placeholder="1234567890">
        </div>
        <div class="form-group">
          <label class="form-label">Atas Nama</label>
          <input v-model="store.businessInfo.bankAccountName" type="text" class="form-input"
            placeholder="Nama penerima transfer">
        </div>
        <div class="form-group form-group--full">
          <label class="form-label">Alamat Bisnis</label>
          <textarea v-model="store.businessInfo.address" rows="2" class="form-input form-textarea"
            placeholder="Jl. Contoh No.1, Kota..."></textarea>
        </div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="section-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5" />
            <path d="M2.5 13c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" />
          </svg>
        </div>
        <h2 class="section-title">Informasi Klien</h2>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Nama Klien <span class="required">*</span></label>
          <input v-model="store.clientInfo.name" type="text" required class="form-input"
            placeholder="Nama klien atau perusahaan">
        </div>
        <div class="form-group">
          <label class="form-label">Email Klien</label>
          <input v-model="store.clientInfo.email" type="email" class="form-input" placeholder="klien@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">No WhatsApp Klien</label>
          <input v-model="store.clientInfo.whatsapp" type="tel" class="form-input" placeholder="08xx-xxxx-xxxx">
        </div>
        <div class="form-group">
          <label class="form-label">Nomor Invoice <span class="required">*</span></label>
          <input v-model="store.clientInfo.invoiceNumber" type="text" required class="form-input"
            placeholder="INV/2025/001">
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Terbit <span class="required">*</span></label>
          <input v-model="store.clientInfo.issueDate" type="date" required class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Jatuh Tempo <span class="required">*</span></label>
          <input v-model="store.clientInfo.dueDate" type="date" required class="form-input">
        </div>
        <div class="form-group form-group--full">
          <label class="form-label">Alamat Klien</label>
          <textarea v-model="store.clientInfo.address" rows="2" class="form-input form-textarea"
            placeholder="Alamat pengiriman invoice..."></textarea>
        </div>
      </div>
    </div>

    <!-- Items -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="section-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <h2 class="section-title">Detail Item</h2>
        <button type="button" @click="store.addItem()" class="btn-add-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
          Tambah Item
        </button>
      </div>

      <!-- Items Table Header -->
      <div class="items-table-header">
        <span class="col-desc">Deskripsi</span>
        <span class="col-qty">Jumlah</span>
        <span class="col-price">Harga Satuan</span>
        <span class="col-total">Total</span>
        <span class="col-action"></span>
      </div>

      <div class="items-list">
        <div v-for="(item, index) in store.items" :key="item.id" class="item-row">
          <div class="col-desc">
            <input v-model="item.description" type="text" required class="form-input"
              :placeholder="`Item ${index + 1}`">
          </div>
          <div class="col-qty">
            <input v-model.number="item.quantity" type="number" min="1" required
              @input="store.updateItem(item.id, 'quantity', item.quantity)" class="form-input text-center">
          </div>
          <div class="col-price">
            <div class="input-prefix-wrap">
              <span class="input-prefix">Rp</span>
              <input v-model.number="item.unitPrice" type="number" min="0" required
                @input="store.updateItem(item.id, 'unitPrice', item.unitPrice)" class="form-input with-prefix">
            </div>
          </div>
          <div class="col-total">
            <span class="item-total">{{ formatRupiah(item.quantity * item.unitPrice) }}</span>
          </div>
          <div class="col-action">
            <button v-if="store.items.length > 1" type="button" @click="store.removeItem(item.id)" class="btn-remove"
              title="Hapus item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Subtotal -->
      <div class="items-subtotal">
        <span class="subtotal-label">Subtotal</span>
        <span class="subtotal-value">{{ formatRupiah(store.subtotal) }}</span>
      </div>
    </div>

    <!-- Discount, Tax & Notes -->
    <div class="form-card">
      <div class="form-card-header">
        <div class="section-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14L14 2M5 4a1 1 0 110 2 1 1 0 010-2zm6 6a1 1 0 110 2 1 1 0 010-2z" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <h2 class="section-title">Diskon, Pajak & Catatan</h2>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Tipe Diskon</label>
          <select v-model="store.discountType" class="form-input form-select">
            <option value="percentage">Persen (%)</option>
            <option value="amount">Nominal (Rp)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Nilai Diskon</label>
          <input v-model.number="store.discountValue" type="number" min="0" class="form-input" placeholder="0">
        </div>
        <div class="form-group">
          <label class="form-label">Pajak (%)</label>
          <input v-model.number="store.taxRate" type="number" min="0" step="0.1" class="form-input" placeholder="11">
        </div>
        <div class="form-group form-group--full">
          <label class="form-label">Catatan</label>
          <textarea v-model="store.notes" rows="3" class="form-input form-textarea"
            placeholder="Terima kasih atas kepercayaan Anda. Pembayaran harap dilakukan sebelum jatuh tempo."></textarea>
        </div>
      </div>

      <!-- Summary -->
      <div class="invoice-summary">
        <div class="summary-row" v-if="store.discountValue > 0">
          <span>Diskon</span>
          <span class="summary-discount">- {{ formatRupiah(store.discountAmount) }}</span>
        </div>
        <div class="summary-row" v-if="store.taxRate > 0">
          <span>PPN {{ store.taxRate }}%</span>
          <span>{{ formatRupiah(store.taxAmount) }}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>{{ formatRupiah(store.total) }}</span>
        </div>
      </div>
    </div>

    <PaymentSection @payment-updated="handlePaymentUpdated" />

    <!-- Actions -->
    <div class="form-actions">
      <button type="button" @click="store.resetForm()" class="btn-secondary">
        Reset
      </button>
      <button type="submit" :disabled="store.saving || !isFormValid" class="btn-primary">
        <svg v-if="store.saving" class="btn-spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="20"
            stroke-dashoffset="10" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.5 4.5l-7 7L3 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        {{ store.saving ? 'Menyimpan...' : 'Simpan Invoice' }}
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore'
import PaymentSection from './PaymentSection.vue';

const props = withDefaults(defineProps<{
  mode?: 'create' | 'edit'
  invoiceId?: string
}>(), {
  mode: 'create',
  invoiceId: ''
})

const handlePaymentUpdated = () => {
  // Optional: Trigger re-render atau validasi tambahan
  console.log('Payment updated')
}

const store = useInvoiceStore()
const emit = defineEmits(['saved', 'pdf-generated'])

// Test koneksi saat komponen dimuat
onMounted(async () => {
  const { testConnection } = useSupabase()
  await testConnection()
})

// Validasi form
const isFormValid = computed(() => {
  return store.businessInfo.name &&
    store.businessInfo.email &&
    store.clientInfo.name &&
    store.clientInfo.invoiceNumber &&
    store.items.every(item => item.description && item.quantity > 0 && item.unitPrice >= 0)
})

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert('Mohon lengkapi semua field yang wajib diisi!')
    return
  }

  let result: any
  const payload = store.formattedForDatabase

  if (props.mode === 'edit' && props.invoiceId) {
    result = await store.updateInvoice(props.invoiceId, payload)
  } else {
    result = await store.saveInvoice()
  }

  if (result.success) {
    const pdfData = {
      businessInfo: store.businessInfo,
      clientInfo: store.clientInfo,
      items: store.items,
      subtotal: store.subtotal,
      discountAmount: store.discountAmount,
      discountValue: store.discountValue,
      discountType: store.discountType,
      taxRate: store.taxRate,
      taxAmount: store.taxAmount,
      total: store.total,
      notes: store.notes,
      selectedTemplate: store.selectedTemplate,
      templateAccentColor: store.templateAccentColor,
      // payment data
      payments: store.payments,
      totalPaid: store.totalPaid,
      remainingBalance: store.remainingBalance,
      paymentStatus: store.paymentStatus
    }

    emit('saved', result.data)
    emit('pdf-generated', pdfData)

    if (props.mode === 'create') {
      store.resetForm()
    }
  } else {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : result.error?.message || 'Unknown error'
    alert(`Gagal menyimpan invoice: ${errorMessage}`)
  }
}
</script>

<style scoped>
.invoice-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Card */
.form-card {
  background: #fff;
  border: 1px solid #E5EDFF;
  border-radius: 14px;
  padding: 1.5rem;
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
  margin-bottom: 1.25rem;
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

.section-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.01em;
  flex: 1;
  margin: 0;
}

/* Grid */
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

.required {
  color: #2563EB;
}

/* Inputs */
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

.form-textarea {
  resize: vertical;
  min-height: 72px;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 2rem;
}

.text-center {
  text-align: center;
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

/* Items table */
.items-table-header {
  display: grid;
  grid-template-columns: 1fr 80px 140px 110px 36px;
  gap: 0.625rem;
  padding: 0 0 0.5rem 0;
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: 0.75rem;
}

.items-table-header span {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9CA3AF;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.item-row {
  display: grid;
  grid-template-columns: 1fr 80px 140px 110px 36px;
  gap: 0.625rem;
  align-items: center;
}

.col-desc,
.col-qty,
.col-price,
.col-total,
.col-action {
  display: flex;
  align-items: center;
}

.item-total {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
}

.btn-add-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.4375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #2563EB;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  margin-left: auto;
}

.btn-add-item:hover {
  background: #DBEAFE;
  border-color: #93C5FD;
}

.btn-remove {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  padding: 0;
}

.btn-remove:hover {
  color: #EF4444;
  background: #FEF2F2;
  border-color: #FECACA;
}

/* Subtotal */
.items-subtotal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.875rem;
  border-top: 1px solid #F3F4F6;
}

.subtotal-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.subtotal-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  min-width: 120px;
  text-align: right;
}

/* Summary */
.invoice-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #F3F4F6;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6B7280;
}

.summary-discount {
  color: #16A34A;
}

.summary-total {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  padding-top: 0.625rem;
  margin-top: 0.25rem;
  border-top: 1px solid #E5E7EB;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.25rem;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #2563EB;
  border: 1px solid #2563EB;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.btn-primary:hover:not(:disabled) {
  background: #1D4ED8;
  border-color: #1D4ED8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-spinner {
  animation: spin 0.8s linear infinite;
}
</style>