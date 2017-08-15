# dream code in 2017


## Example 1: get The beatles each member's other band


{
  item("The Beatles") {
    has_part {
      label("zh-cn")
      member_of {
        label("zh-cn")
      }
    }
  }  
}


## Example 2: get Japan's all railroad line's route map, length,date of official opening

{
  item("Japan") {
    all_instance("Railroad line") {
      label("zh-cn")
      length
      date_of_official_opening
      route_map {
        url
      }
    }
  }  
}
