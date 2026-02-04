require('dotenv').config();
const info = require('./version.json');

module.exports = {
  appVersion: info.version,
  appBuild: info.build,
  port: process.env.PORT || 4000,
  secret: process.env.AUTH_SECRET || 'jwt-default-secret',
  
  // MongoDB Configuration
  mongo: {
    uri: process.env.MONGO_URI,
    srv: (process.env.MONGO_SRV || '').toString() === 'true',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    authenticationDatabase: process.env.MONGO_AUTHENTICATION_DATABASE,
    hostname: process.env.MONGO_HOSTNAME,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE_NAME || 'clover',
  },
  
  dataFolder: './data',
  
  // Root User Configuration
  rootUser: {
    username: process.env.ROOT_USER_USERNAME || 'admin',
    email: process.env.ROOT_USER_EMAIL || 'admin@example.com',
    password: process.env.ROOT_USER_PASSWORD || 'admin',
    firstName: process.env.ROOT_USER_FIRST_NAME || 'Admin',
    lastName: process.env.ROOT_USER_LAST_NAME || 'User',
  },
  
  // IP Configuration for WebRTC
  ipAddress: {
    ip: process.env.MAPPED_IP === 'true' ? '0.0.0.0' : process.env.PUBLIC_IP_ADDRESS || '127.0.0.1',
    announcedIp: process.env.MAPPED_IP === 'true' ? process.env.PUBLIC_IP_ADDRESS || null : null,
  },

  // Email Configuration
  nodemailerEnabled: process.env.MAILER_ENABLED === 'true' || false,
  nodemailer: {
    from: process.env.MAILER_FROM || 'Clover <no-reply@yourdomain.tld>',
  },
  nodemailerTransport: {
    service: process.env.MAILER_SERVICE || undefined,
    host: process.env.MAILER_HOST || 'smtp.yourdomain.tld',
    port: process.env.MAILER_PORT || 587,
    secure: process.env.MAILER_SECURE === 'true' || false,
    auth: {
      user: process.env.MAILER_USERNAME || 'no-reply@yourdomain.tld',
      pass: process.env.MAILER_PASSWORD || '',
    },
  },

  // Hardcoded Settings
  retryAfter: 10000,
  sizes: [256, 512, 1024, 2048],
  
  // Legacy mediaCodecs (kept for compatibility)
  mediaCodecs: [
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: 'video',
      mimeType: 'video/VP8',
      clockRate: 90000,
      parameters: { 'x-google-start-bitrate': 1000 },
    },
  ],
  
  // Mediasoup Configuration for WebRTC Audio/Video Calls
  mediasoup: {
    // Worker settings
    worker: {
      rtcMinPort: process.env.RTC_MIN_PORT || 10000,
      rtcMaxPort: process.env.RTC_MAX_PORT || 12000,
      logLevel: process.env.MEDIASOUP_LOG_LEVEL || 'warn',
      logTags: [
        'info',
        'ice',
        'dtls',
        'rtp',
        'srtp',
        'rtcp',
        'rtx',
        'bwe',
        'score',
        'simulcast',
        'svc',
        'sctp'
      ],
    },
    
    // Router settings
    router: {
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/VP9',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/h264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '42e01f',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/h264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '4d0032',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000
          }
        }
      ]
    },
    
    // WebRTC transport settings
    webRtcTransport: {
      listenIps: [
        { 
          ip: process.env.MAPPED_IP === 'true' ? '0.0.0.0' : process.env.PUBLIC_IP_ADDRESS || '127.0.0.1',
          announcedIp: process.env.MAPPED_IP === 'true' ? process.env.PUBLIC_IP_ADDRESS || null : null
        }
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      maxIncomingBitrate: 1500000,
      initialAvailableOutgoingBitrate: 1000000
    },
    
    // Producer settings
    producer: {
      kind: 'audio',
      rtpParameters: {
        codecs: [
          {
            mimeType: 'audio/opus',
            payloadType: 111,
            clockRate: 48000,
            channels: 2,
            parameters: {
              minptime: 10,
              useinbandfec: 1
            }
          }
        ],
        encodings: [{ ssrc: 11111111 }]
      }
    }
  },
  
  // STUN/TURN servers configuration
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
      ]
    }
    // Add your TURN servers here if needed:
    // {
    //   urls: 'turn:your-turn-server.com:3478',
    //   username: 'your-username',
    //   credential: 'your-password'
    // }
  ],
  
  // Support email
  supportEmail: process.env.SUPPORT_EMAIL_ADDRESS || 'support@example.com'
};
