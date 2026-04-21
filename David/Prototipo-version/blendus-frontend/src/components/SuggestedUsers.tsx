import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { User } from '../lib/api';

export default function SuggestedUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.getSuggestedUsers().catch(() => {
            // fallback to static list if not logged in
            setUsers([
                { id: 1, name: 'John Smoothie', posts_count: 12 } as User,
                { id: 2, name: 'Marie Parker', posts_count: 8 } as User,
                { id: 3, name: 'Julia Rivera', posts_count: 6 } as User,
            ]);
        }).then(data => data && setUsers(data));
    }, []);

    const descriptions: Record<number, string> = {
        1: 'Great at fruit combos',
        2: '+500 recipes',
        3: 'Experienced nutritionist',
        4: 'Loves matcha 🍵',
        5: 'Protein shake expert 💪',
    };

    const avatarColors = ['#00D492', '#9AE600', '#00BC7D', '#007A55', '#247857'];

    return (
        <div className="suggested-card">
            <h2>Suggested for you</h2>
            {users.map((user, i) => (
                <div className="suggested-user-row" key={user.id}>
                    <div className="suggested-user-info">
                        <div className="suggested-avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                        </div>
                        <div>
                            <div className="suggested-name">{user.name}</div>
                            <div className="suggested-desc">{descriptions[user.id] ?? `${user.posts_count ?? 0} posts`}</div>
                        </div>
                    </div>
                    <a href={`/profile/${user.id}`} className="btn" style={{ fontSize: '.8rem', padding: '.35rem .9rem' }}>
                        View
                    </a>
                </div>
            ))}
        </div>
    );
}
