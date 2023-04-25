# Customer Portal API

## Setup
- Follow the [core setup](core.md#setup) to initiate the database
- Copy `etc/customerportal.conf` to `customerportal.conf` and edit accordingly
- For web setup see [web.md](web.md#setup)

## Operation
- Start API
```shell
python -m stustapay.customer_portal -c customerportal.conf -vvv api
```
- To start the web ui see [web.md](web.md#running)