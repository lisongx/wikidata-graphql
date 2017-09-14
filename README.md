# Wikidata + GraphQL: Dream API In 2017

## Example query 1:

Get the all members of _the Beatles_  and where they were born and their twitter username.

(permalink for this query at http://bit.ly/2eXTmbG )

```
{
  entity(id: "Q1299") {
    label(lang: "en")
    has_part {
      mainsnak {
        label(lang: "en")
        award_received {
          mainsnak {
            label(lang: "en")
          }
        }
        place_of_birth {
          mainsnak {
            label(lang: "en")
          }
        }
        twitter_username {
          mainsnak
        }
      }
    }
  }
}
```

## Example query 2

Get China's all past head_of_government,  and where they educated_at, and what other positions they've held before.

(permalink for this query at http://bit.ly/2xmxaT1 )

```
{
  entity(id: "Q148") {
    label(lang: "en")
    head_of_government {
      mainsnak {
        label(lang: "en")
        educated_at {
          mainsnak {
            id
            label(lang: "en")
          }
        }
        position_held {
         	mainsnak {
            label(lang: "en")
          }
        }
      }
    }
  }
}
```


# TODOS

1. need add reference and qualifiers
2. support search entities
3. other datatype like Time and Media, Geographic object to the graphql schema
4. and maybe thing to help make some of reverse lookup possible
