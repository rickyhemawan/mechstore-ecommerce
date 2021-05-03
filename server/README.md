# ecommerce-server
API server untuk e-commerce website

`.env`

```
DB_USERNAME_DEVELOPMENT='postgres'
DB_PASSWORD_DEVELOPMENT='password'
DB_DATABASE_DEVELOPMENT='e-commerce-cms-development'
DB_HOST_DEVELOPMENT='localhost'
DB_DIALECT_DEVELOPMENT='postgres'

DB_USERNAME_TEST='postgres'
DB_PASSWORD_TEST='password'
DB_DATABASE_TEST='e-commerce-cms-test'
DB_HOST_TEST='localhost'
DB_DIALECT_TEST='postgres'

JWT_SECRET='sassy kitten'
```

## List of available endpoints

### User

* `POST /register`
* `POST /login`
* `GET /user`

### Product

* `POST /products`
* `GET /products`
* `GET /products/:id`
* `PUT /products/:id`
* `PATCH /products/:id`
* `DELETE /products/:id`

### Categories

There is no `POST` endpoint for categories, categories automatically created within the creation of the product with unique category name, else the product will use existing name.

* `GET /categories`

### Banner

* `POST /banners`
* `GET /banners`
* `GET /banners/:id`
* `PUT /banners/:id`
* `PATCH /banners/:id`
* `DELETE /banners/:id`

### Wishlist

* `POST /wishlists/:productId`
* `GET /wishlists`
* `DELETE /wishlists/:id`

### Cart

* `GET /carts`
* `DELETE /carts`
* `POST /carts/checkout`
* `POST /carts/:productId`
* `PATCH /carts/:id`
* `DELETE /carts/:id`

## User

### POST /register

Request:

- headers :

```json
{
  "Content-Type": "application/json"
}
```

- body : 

```json
{
  "email": "your-email-here",
  "password": "<your-password-here>",
  "name": "Tess Greymane"
  "role": "<default-is-customer>" (admin or customer)
}
```

Response:

- body:

```json
{
    "id": 4,
    "name": "jack",
    "email": "customer@email.com",
    "role": "customer"
}
```

Error: 

- status: `400`
- body: 

```json
{
  "message": ["Email already exist"]
}
```
```json
{
  "message": ["Full Name cannot be empty"]
}
```
```json
{
  "message": ["Email cannot be empty"]
}
```
```json
{
  "message": ["Password cannot be empty"]
}
```
```json
{
  "message": ["Password must be higher than 6 character"]
}
```
- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```


### POST /login

Request:

- headers :

```json
{
  "Content-Type": "application/json"
}
```

- body : 

```json
{
  "email": "your-email-here",
  "password": "<your-password-here>"
}
```

Response:

- body:

```json
{
    "id": 1,
    "name": "admin",
    "email": "admin@mail.com",
    "role": "admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNjMxNzgxMH0.b8Q_tuWcYkpyL7_0UXv1cd8bLmsCIg2nxVCr8LUMnCI"
}
```

Error: 

- status: `400`
- body: 

```json
{
  "message": ["email or password must not be empty"]
}
```

- status: `401`
- body: 

```json
{
  "message": ["invalid email or password"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `GET /user`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "id": 2,
    "email": "customer@email.com",
    "name": "jack",
    "role": "customer"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```


- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



## Products

### `POST /products`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
  "name" : "kekleo",
  "price" : 2255,
  "stock" : 1,
  "category" : "memes"
}
```

Response:

- body:

```json
{
    "id": 44,
    "name": "kekleo",
    "image_url": null,
    "price": 2255,
    "stock": 1,
    "CategoryId": 1,
    "updatedAt": "2021-03-21T09:21:30.077Z",
    "createdAt": "2021-03-21T09:21:30.077Z"
}
```

Error: 

- status: `400`
- body:

```json
{
    "message": [
        "name cannot be empty"
    ]
}
```

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



### `GET /products`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
[
    {
        "id": 1,
        "name": "kekw",
        "image_url": null,
        "price": 1999,
        "stock": 1,
        "createdAt": "2021-03-16T15:29:24.167Z",
        "updatedAt": "2021-03-16T15:29:24.167Z",
        "CategoryId": null,
        "Category": null
    },
    {
        "id": 2,
        "name": "hehe",
        "image_url": null,
        "price": 2255,
        "stock": 1,
        "createdAt": "2021-03-16T15:42:37.751Z",
        "updatedAt": "2021-03-16T15:42:37.751Z",
        "CategoryId": null,
        "Category": null
    },
]
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```


- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



### `GET /products/:id`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "id": 1,
    "name": "kekw",
    "image_url": null,
    "price": 1999,
    "stock": 1,
    "createdAt": "2021-03-16T15:29:24.167Z",
    "updatedAt": "2021-03-16T15:29:24.167Z",
    "CategoryId": null
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



### `PUT /products/:id`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body :

```json
{
  "name" : "kurwa",
  "price" : 3000,
  "category" : "memes"
}
```

Response:

- body:

```json
{
    "id": 1,
    "name": "kurwa",
    "image_url": null,
    "price": "3000",
    "stock": "1",
    "createdAt": "2021-03-16T15:29:24.167Z",
    "updatedAt": "2021-03-21T09:25:51.519Z",
    "CategoryId": 1
}

```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



### `PATCH /products/:id`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
  "stock": 1000
}
```

Response:

- body:

```json
{
    "id": 1,
    "name": "kurwa",
    "image_url": null,
    "price": "3000",
    "stock": "1000",
    "createdAt": "2021-03-16T15:29:24.167Z",
    "updatedAt": "2021-03-21T09:25:51.519Z",
    "CategoryId": 1
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```



### `DELETE /products/:id`


Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "product deletion is successful"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

## Categories

### `GET /categories`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
[
    {
        "id": 1,
        "name": "memes",
        "createdAt": "2021-03-16T15:26:17.702Z",
        "updatedAt": "2021-03-16T15:26:17.702Z"
    },
    {
        "id": 2,
        "name": "hearthstone",
        "createdAt": "2021-03-20T22:05:49.734Z",
        "updatedAt": "2021-03-20T22:05:49.734Z"
    },
    {
        "id": 3,
        "name": "jacky",
        "createdAt": "2021-03-20T23:02:49.626Z",
        "updatedAt": "2021-03-20T23:02:49.626Z"
    },
    {
        "id": 4,
        "name": "apple",
        "createdAt": "2021-03-20T23:23:18.092Z",
        "updatedAt": "2021-03-20T23:23:18.092Z"
    },
    {
        "id": 5,
        "name": "switch",
        "createdAt": "2021-03-21T02:27:14.987Z",
        "updatedAt": "2021-03-21T02:27:14.987Z"
    }
]
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```


- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

## Banner

### `POST /banners`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
  "title": "hello",
  "image_url": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg",
  "status": true,
}
```

Response:

- body:

```json
{
    "id": 3,
    "title": "hello",
    "status": true,
    "image_url": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg",
    "updatedAt": "2021-03-21T04:58:08.363Z",
    "createdAt": "2021-03-21T04:58:08.363Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```


- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `GET /banners`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
[
    {
        "id": 5,
        "title": "GAMMERRRR",
        "image_url": "https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2019/08/VANTAR-MX-banner_2480.jpg",
        "status": false,
        "createdAt": "2021-03-21T06:51:07.483Z",
        "updatedAt": "2021-03-21T06:52:29.229Z"
    },
    {
        "id": 4,
        "title": "perfect keyboard",
        "image_url": "https://pbs.twimg.com/media/EY3FpqgWkAgM1GO.jpg",
        "status": false,
        "createdAt": "2021-03-21T06:01:52.774Z",
        "updatedAt": "2021-03-21T06:52:31.002Z"
    },
    {
        "id": 2,
        "title": "hello",
        "image_url": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg",
        "status": true,
        "createdAt": "2021-03-20T19:16:02.501Z",
        "updatedAt": "2021-03-21T05:35:37.540Z"
    }
]
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `GET /banners/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "id": 4,
    "title": "asdqwe",
    "image_url": "https://pbs.twimg.com/media/EY3FpqgWkAgM1GO.jpg",
    "status": false,
    "createdAt": "2021-03-21T06:01:52.774Z",
    "updatedAt": "2021-03-21T06:01:57.369Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `PUT /banners/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
  "title": "coolboii",
  "image": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg" 
}
```

Response:

- body:

```json
{
    "id": 3,
    "title": "coolboii",
    "image_url": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg",
    "status": false,
    "createdAt": "2021-03-21T04:58:08.363Z",
    "updatedAt": "2021-03-21T06:37:37.139Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `PATCH /banners/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
  "status": true,
}
```

Response:

- body:

```json
{
    "id": 2,
    "title": "hello",
    "image_url": "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/07/Gapuradesign.jpg",
    "status": true,
    "createdAt": "2021-03-20T19:16:02.501Z",
    "updatedAt": "2021-03-21T09:36:14.725Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `DELETE /banners/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "banner deletion is successful"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

## Wishlist
### `POST /wishlists/:productId`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "id": 41,
    "ProductId": 1,
    "UserId": 2,
    "updatedAt": "2021-03-25T00:12:04.047Z",
    "createdAt": "2021-03-25T00:12:04.047Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `GET /wishlists`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
[
    {
        "id": 34,
        "UserId": 2,
        "ProductId": 2,
        "createdAt": "2021-03-24T22:45:33.814Z",
        "updatedAt": "2021-03-24T22:45:33.814Z"
    },
    {
        "id": 35,
        "UserId": 2,
        "ProductId": 1,
        "createdAt": "2021-03-24T22:46:05.847Z",
        "updatedAt": "2021-03-24T22:46:05.847Z"
    },
    {
        "id": 38,
        "UserId": 2,
        "ProductId": 12,
        "createdAt": "2021-03-24T23:19:09.762Z",
        "updatedAt": "2021-03-24T23:19:09.762Z"
    },
    {
        "id": 39,
        "UserId": 2,
        "ProductId": 3,
        "createdAt": "2021-03-24T23:26:58.031Z",
        "updatedAt": "2021-03-24T23:26:58.031Z"
    },
    {
        "id": 40,
        "UserId": 2,
        "ProductId": 8,
        "createdAt": "2021-03-24T23:26:59.639Z",
        "updatedAt": "2021-03-24T23:26:59.639Z"
    }
]
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `DELETE /wishlists/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "wishlist deletion is successful"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

## Cart

### `GET /carts`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
[
    {
        "id": 12,
        "UserId": 2,
        "ProductId": 4,
        "qty": 2,
        "createdAt": "2021-03-25T02:10:22.641Z",
        "updatedAt": "2021-03-25T02:42:42.195Z",
        "Product": {
            "id": 4,
            "name": "Cherry MX Blue",
            "image_url": "https://images.tokopedia.net/img/cache/500-square/product-1/2020/2/4/2766371/2766371_20338cac-b446-48ad-ac2b-6582befdaa0a_600_600?ect=4g",
            "price": 3000,
            "stock": 4991,
            "createdAt": "2021-03-25T01:37:48.758Z",
            "updatedAt": "2021-03-25T03:45:03.627Z",
            "CategoryId": 1
        }
    }
]
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `DELETE /carts`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "successfully removed cart"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `POST /carts/checkout`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "successfully checked out"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `POST /carts/:productId`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
    "qty": 1
}
```

Response:

- body:

```json
{
    "id": 12,
    "UserId": 2,
    "ProductId": 4,
    "qty": 2,
    "createdAt": "2021-03-25T02:10:22.641Z",
    "updatedAt": "2021-03-25T02:42:42.195Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `PATCH /carts/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

- body:

```json
{
    "qty": 15
}
```

Response:

- body:

```json
{
    "id": 2,
    "UserId": 2,
    "ProductId": 1,
    "qty": 15,
    "createdAt": "2021-03-25T01:39:29.427Z",
    "updatedAt": "2021-03-25T01:46:57.126Z"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```

### `DELETE /carts/:id`

Request:

- headers :

```json
{
  "Content-Type": "application/json",
  "access_token": "<your-access-token>"
}
```

Response:

- body:

```json
{
    "message": "successfully delete one product in cart"
}
```

Error: 

- status: `401`
- body: 

```json
{
  "message": ["user not authenticated"]
}
```

```json
{
  "message": ["user not authorized"]
}
```

- status: `404`
- body:
```json
{
  "message": ["data not found"]
}
```

- status: `500`
- body:
```json
{
  "message": ["internal server error"]
}
```
