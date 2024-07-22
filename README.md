```html
<p align="center">
  <a href="https://skillicons.dev">
    <img
      src="https://skillicons.dev/icons?i=nodejs,express,mysql,aws,git,github,react,js,css,figma,vite"
    />
  </a>
</p>
```

**For running the project, execute these two commands:**

1. **🏗 Download all dependencies**
   ```
   cd client && npm i && cd ../server && npm i
   ```
2. **🏁 Run project**
   ```
   npm start
   ```

---

**⚙ `.env` variables**

```
# Server
PORT = 8080
DOMAIN  = http://localhost:8080

# MySQL
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_NAME = job_board

# Nodemailer
MAIL_USER =
MAIL_PASS =

# JWT
JWT_SECRET =
JWT_EXPIRES =

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET_NAME=
```

**📦 AWS S3 Setup**

Bucket policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

Cross-origin resource sharding (CORS):

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

For best practices create an Identity and Access Management (IAM) user. Click on `Add permissions --> Create inline policy --> JSON --> ctrl + v JSON content `

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::your-bucket-name",
				"arn:aws:s3:::your-bucket-name/*"
			]
		}
	]
}
```

`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are also extracted from this IAM user in section `Users --> Security credentials --> Access keys --> Create access key`

---

🎨 **[Mock Figma Design](https://www.figma.com/design/qddYw8hDrG7ztUBGP9T6zf/Job-Board?node-id=0-1&t=9Ll8kh17qngVnt9c-1)**
