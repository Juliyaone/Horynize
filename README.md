# Horynize
Horynize


# 1 Авторизация пользователя
https://horynize.cygenic.tech/api/users/auth

{"0":{"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2hvcnluaXplLmV1cm9kaXIucnUiLCJhdWQiOiJodHRwczovL2hvcnluaXplLmV1cm9kaXIucnUiLCJpYXQiOjE2OTY2MTI4NjQsIm5iZiI6MTY5NjYxMjg2NCwiZXhwIjoxNjk2NjIwNjY0LCJkYXRhIjp7ImlkX3VzZXIiOjEsInVzZXJuYW1lIjoidmljdG9ydW5pMSIsImVtYWlsIjoiYWRtaW42QHNhbnJ1c2ttdi5ydSJ9fQ.PfdKEE1FZhJHzyJU0SCpjBKYcB699tyx1vujJ76mmOk","id_user":1,"username":"victoruni1","email":"admin6@sanruskmv.ru"},"controllers":[{"id_controller":6,"name":"","id_model":0}]}

# 2 Регистрация пользователя
https://horynize.cygenic.tech/api/users/reguser
нет данных

# 3 Изменение данных пользователя
https://horynize.cygenic.tech/api/users/edituser
нет данных

# 4 Список моделей
https://horynize.cygenic.tech/api/info/models

{"models":[{"id_model":1,"name":"Horynize.CF-500","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.CF-500.png"},{"id_model":2,"name":"Horynize.CF-700","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.CF-700.png"},{"id_model":3,"name":"Horynize.CF-1100","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.CF-1100.png"},{"id_model":4,"name":"Horynize.WF-1200","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.WF-1200.png"},{"id_model":5,"name":"Horynize.WF-800","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.WF-800.png"},{"id_model":6,"name":"Horynize.EF-450","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.EF-450.png"},{"id_model":7,"name":"Horynize.EF-700","img":"http:\/\/95.142.39.79\/images\/models\/Horynize.EF-700.png"},{"id_model":8,"name":"Horynize.EF-400V","img":""},{"id_model":9,"name":"Horynize.EF-600V","img":""}]}


# 5 Контакты производителя
https://horynize.cygenic.tech/api/info/contacts

{"contacts":[{"name":"ООО «Хоринайз»","phone":"8 (495) 120 08 38","email":"info@horynize.ru","address":"445042, Самарская область, г. Тольятти, б-р\r\nЛуначарского, д. 4, кв. 93\r\n"}]}

# 6 Список контроллеров пользователя
https://horynize.cygenic.tech/api/vent-units/all
{
    "userId": 1,
    "status": "1"
}

status - 1 - привязанные,
0 – непривязанные


{ "0": { "id_user": "" }, "vent-units": [ { "id_controller": 6, "name": "" } ] }

# 7 Привязка/отвязка, контроллера к пользователю,  редактирование custonName
https://horynize.cygenic.tech/api/vent-units/bind
нет данных

# 8 Получение параметров контроллера (данные цели, даны датчиков)
https://horynize.cygenic.tech/api/vent-units/getparams
{"vent-unit":[{"id_vent-unit":"6"}],"data":[{"enabled":"1","res":3,"tempChannel":12.9000000000000003552713678800500929355621337890625,"ZagrFiltr":30,"fanSpeedP":1,"fanSpeedV":0,"tempRoom":22.39999999999999857891452847979962825775146484375,"humRoom":42,"co2Room":0,"tempTarget":21,"fanSpeedPTarget":4,"fanSpeedVTarget":0,"humRoomTarget":39,"co2RoomTarget":0,"mode":2}]}

# 9 Получить Список таймеров дня
https://horynize.cygenic.tech/api/vent-units/timers
{"vent-unit":[{"id_vent-unit":"6","day":0}],"timers":[{"num":1,"time":"09:41","tempTarget":16,"fanSpeed":1},{"num":2,"time":"00:00","tempTarget":0,"fanSpeed":255},{"num":3,"time":"00:00","tempTarget":0,"fanSpeed":255},{"num":4,"time":"00:00","tempTarget":0,"fanSpeed":255}]}

# 10 Установка параметров
https://horynize.cygenic.tech/api/vent-units/setparams
отправляем 
{
  "controllerId": "6",
  "fanTarget":"4"
}
получаем 
{"vent-unit":[{"id_vent-unit":"6"}],"data":[{"fanSpeedP":1,"fanSpeedV":0,"fanSpeedPTarget":4,"fanSpeedVTarget":0}]}

отправляем 
{
  "controllerId": "6",
  "HumTarget":"15",
  "CO2Target": "700"
}
получаем 
{ "vent-unit": [ { "id_vent-unit": "6" } ], "data": [ { "humRoom": 42, "co2Room": 0, "humRoomTarget": 39, "co2RoomTarget": 0 } ] }


отправляем 
{
  "controllerId": "6",
  "tempTarget":"15"
}
получаем 
{ "vent-unit": [ { "id_vent-unit": "6" } ], "data": [ { "tempChannel": 12.4000000000000003552713678800500929355621337890625, "tempTarget": 21 } ] }


отправляем 
{
  "controllerId": "6",
  "start":"1"     или "start":"0" 
}
получаем 
{ "vent-unit": [ { "id_vent-unit": "6" } ], "data": [ { "enabled": "1" } ] }


отправляем 
{
  "controllerId": "6",
  "res":"1" или "res":"2" или "res":"3" или "res":"4" 
}
получаем 
{ "vent-unit": [ { "id_vent-unit": "6" } ], "data": [ { "res": "1" } ] }


# 11 Установка дней, для которых подключен таймер
https://horynize.cygenic.tech/api/vent-units/setdaystimers

соответсвие дней недели
sunday 0000001
monday 0000010
tuesday 0000100
wednesday 0001000
thusday 0010000
friday 0100000
saturday 1000000

отправляем 
{
  "controllerId": "6",
  "days":"0000100"
}
получаем 
{"message": " command send "}


# 12 Установка таймеров для дня  (4 таймера на день)
https://horynize.cygenic.tech/api/vent-units/settimers

отправляем
{
    "controllerId": "6",
    "day": 0,
    "timers": {
        "num1": {
            "time": "7:20",
            "tempTarget": "27.3",
            "fanSpeed": "3"
        },
        "num2": {
            "time": "8:30",
            "tempTarget": "25.3",
            "fanSpeed": "4"
        },
        "num3": {
            "time": "15:20",
            "tempTarget": "30",
            "fanSpeed": "255"
        },
        "num4": {
            "time": "19:20",
            "tempTarget": "21.3",
            "fanSpeed": "5"
        }
    }
}

получаем 
{"message": " command send "}
