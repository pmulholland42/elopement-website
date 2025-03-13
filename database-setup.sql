CREATE TABLE IF NOT EXISTS party (
    id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
    name TEXT NOT NULL,
	completed BOOLEAN DEFAULT false,
	contact TEXT DEFAULT 'Jacqui'
);

CREATE TABLE IF NOT EXISTS invitee (
    id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
    party_id TEXT NOT NULL,
    name TEXT,
	alt_name TEXT,
    accepted BOOLEAN,
	created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (party_id) REFERENCES party(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cookie_response (
	id TEXT DEFAULT left(md5(random()::text), 8) PRIMARY KEY,
	name TEXT,
	cookies TEXT
);