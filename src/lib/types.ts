export interface Profile {
    id: string
    first_name: string
    middle_name?: string
    last_name: string
    phone_number: string
    date_of_birth: string
    gender: 'Male' | 'Female' | 'Prefer not to say'
    is_blocked: boolean
    is_trusted: boolean
    created_at: string
    email?: string
}

export interface Admin {
    id: string
    name: string
    email: string
    avatar_url?: string
    created_at: string
}

export interface Message {
    id: string
    customer_id: string
    sender_role: 'customer' | 'admin'
    sender_id: string
    content: string
    is_read: boolean
    created_at: string
    admins?: { name: string }
}

export interface AgentAssignment {
    id: string
    customer_id: string
    agent_id: string
    assigned_at: string
    admins?: Admin
}

export interface CustomerWithChat extends Profile {
    last_message?: Message
    unread_count?: number
    assignment?: AgentAssignment
}

export interface Post {
    id: string
    title: string
    body: string
    type: 'announcement' | 'news' | 'update'
    is_published: boolean
    created_by: string
    created_at: string
    updated_at: string
}

export interface Promo {
    id: string
    title: string
    description?: string
    price?: number
    currency: string
    image_url?: string
    destination?: string
    valid_until?: string
    is_published: boolean
    type: 'promo' | 'tour_package'
    created_by: string
    created_at: string
}

export interface GalleryPhoto {
    id: string
    image_url: string
    caption?: string
    sort_order: number
    created_by: string
    created_at: string
}
