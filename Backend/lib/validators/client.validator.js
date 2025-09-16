const { z } = require('zod');

const clientValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  cases: z.array(z.string()).optional(),
  documents: z.number().min(0, 'Documents must be a non-negative number'),
  lastContact: z.string().datetime('Invalid date format'),
  billingStatus: z.enum(['Paid', 'Pending', 'Overdue'], {
    errorMap: () => ({ message: 'Billing status must be Paid, Pending, or Overdue' })
  }),
  totalBilled: z.number().min(0, 'Total billed must be a non-negative number'),
  preferredContact: z.enum(['email', 'WhatsApp', 'SMS'], {
    errorMap: () => ({ message: 'Preferred contact must be email, WhatsApp, or SMS' })
  }),
  avatar: z.string().min(1, 'Avatar is required'),
  company: z.string().optional(),
  userId: z.string().min(1, 'User ID is required')
});

const searchValidationSchema = z.object({
  search: z.string().optional()
});

module.exports = { clientValidationSchema, searchValidationSchema };