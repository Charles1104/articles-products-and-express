DROP table IF EXISTS articles CASCADE;

CREATE TABLE IF NOT EXISTS articles (
  title VARCHAR(200) UNIQUE NOT NULL PRIMARY KEY,
  body text UNIQUE NOT NULL,
  author VARCHAR(25) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

DROP table IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price MONEY NOT NULL,
  inventory INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO articles (title, body, author)
VALUES ('Da Vinci Code','A nice religious story', 'Dan Brown');

INSERT INTO articles (title, body, author)
VALUES ('Madame Bovary','French Story of a rich lady', 'Gustave Flaubert');

INSERT INTO articles (title, body, author)
VALUES ('Anna Karenina','Russian communist story', 'Leo Tostoy');

INSERT INTO articles (title, body, author)
VALUES ('The Great Gatsby','American extravagant person that throws a lot of huge parties', 'Scott Fitzgerald');

INSERT INTO articles (title, body, author)
VALUES ('Emma','Novel about youthful hubris', 'Jane Austen');

INSERT INTO products (name, price, inventory)
VALUES ('Ipad','600', '2000');

INSERT INTO products (name, price, inventory)
VALUES ('Lenovo X-Carbon','2500', '100');

INSERT INTO products (name, price, inventory)
VALUES ('Samsung smartwatch','250', '5000');

INSERT INTO products (name, price, inventory)
VALUES ('X-ray sunglass','75', '7500');

INSERT INTO products (name, price, inventory)
VALUES ('Iphone','1000', '300');


