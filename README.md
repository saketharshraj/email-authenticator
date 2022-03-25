# E-Mail Solutions

All e-mail solution for your project. You can customize this project in your local.

## API Reference


#### Send E-mail

```http
  POST /api/v1/send-email
```

| Parameter   | Type     | Description                    |
| :---------- | :------- | :----------------------------- |
| `id`        | `int`    | **Optional**. Type of service  |
| `project`   | `string` | **Required**. Project name     |
| `email`     | `string` | **Required**. Recepient E-mail |
| `subject`   | `string` | **Required**. E-mail Subject   |

By deafult `id` is set to `1` i.e `OTP SERVICE`.

#### Verify E-mail

```http
  POST /api/v1/verify-email
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `transid` | `string` | **Required**. Transaction id                  |
| `email`   | `string` | **Required**. E-mail that need to be verified |
| `otp`     | `string` | **Required**. OTP of recepient E-mail         |



## Run Locally

Clone the project

```bash
  git clone git remote add origin https://github.com/iot-lab-kiit/email-authenticator.git
```

Go to the project directory

```bash
  cd email-authenticator
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Parameter   |  Description                    |
| :---------- |  :----------------------------- |
| `MONGO_URI` |  MongoDB URL                    |
| `EMAIL`     |  G-mail id of sender           |
| `PASSWORD`  |  G-mail App Password            |


## Author

- [@saketharshraj](https://www.github.com/saketharshraj)

