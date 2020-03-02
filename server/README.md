# Cards API

## Learning
### Get random card
```
GET /api/v1/learn/card
```

### Acknowledge
```
POST /api/v1/learn/aknowledge/{cardsId}
```

## Get Cards
@TODO: add pagination 
```
GET /api/v1/cards
```

## Card CRUD
### Create
```
POST /api/v1/cards/
{
  "querstion": "...",
  "answer": "..."
}
```

### Read
```
GET /api/v1/cards/{cardId}
```

### Edit
```
POST /api/v1/cards/{cardId}
{
  "querstion": "...",
  "answer": "..."
}
```

### Delete
```
DELETE /api/v1/cards/{cardId}
```
